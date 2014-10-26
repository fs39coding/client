/* ************************************************************************
Copyright:

License:

Authors:
************************************************************************ */

/**
 * Util functions for working with dates.
 */
qx.Class.define("fs39exp.util.Date",
{
  statics :
  {
    /**
    * Split seconds into hours, minutes and seconds.
    *
    * @param seconds {Integer} time in seconds.
    * @return {String} hours/minutes/seconds in format "hh:mm:ss".
    */
    printSecondsSplitted : function(seconds)
    {
      var hh = Math.floor(seconds / 3600);
      var mm = Math.floor((seconds % 3600) / 60);
      var ss = (seconds % 3600) % 60;

      if (hh < 10) {
        hh = "0" + hh;
      }

      if (mm < 10) {
        mm = "0" + mm;
      }

      if (ss < 10) {
        ss = "0" + ss;
      }

      return hh + ":" + mm + ":" + ss;
    },


    /**
    * Converts seconds into human readable format: 1 Std. 1 Min. 3 Sek.
    *
    * @param seconds {Integer} time in seconds.
    * @return {String} hours/minutes/seconds in format "x Std. x Min. x Sek.""
    */
    printSecondsExtended : function(seconds)
    {
      var hh = Math.floor(seconds / 3600);
      var mm = Math.floor((seconds % 3600) / 60);
      var ss = (seconds % 3600) % 60;

      var output = "";
      if (hh > 0) {
        output += hh + " Std. ";
      }

      if (hh > 0 || mm > 0) {
        output += mm + " Min. ";
      }

      if ((hh === 0 && ss > 0) || (hh === 0 && mm === 0)) {
        output += ss + " Sek. ";
      }

      return output;
    },


    /**
     * Prints the date of the given timestamp.
     *
     * @param timestamp {Integer} a timestamp.
     * @param shortYear {Boolean ? false} if true, the year will formatted as "yy", otherwise "yyyy".
     * @return {String} date as string.
     */
    printDate : function(timestamp, shortYear) {
      var yearFormat = shortYear ? "yy" : "yyyy";
      timestamp = parseInt(timestamp, 10);
      var locale = qx.locale.Manager.getInstance().getLocale();
      var dateFormatter = new qx.util.format.DateFormat("dd.MM" + "." + yearFormat,locale);
      return dateFormatter.format(new Date(timestamp));
    },


    /**
     * Prints the time of the given timestamp.
     *
     * @param timestamp {Integer} a timestamp.
     * @param withSeconds {Boolean} Whether seconds should be printed or not.
     * @return {String} time as string.
     */
    printTime : function(timestamp, withSeconds) {
      var formatString = withSeconds ? "HH:mm:ss" : "HH:mm";
      timestamp = parseInt(timestamp, 10);
      var locale = qx.locale.Manager.getInstance().getLocale();
      var dateFormatter = new qx.util.format.DateFormat(formatString,locale);
      return dateFormatter.format(new Date(timestamp));
    },


    /**
    * Parses a ISO 8601 into a timestamp.
    *
    * @param isoString {String} an ISO 8601 String.
    * @return {Integer} the timestamp.
    */
    parseIsoString : function(isoString) {
      var numericKeys = [1, 4, 5, 6, 7, 10, 11];
      var timestamp, struct, minutesOffset = 0;

      // ES5 §15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
      // before falling back to any implementation-specific date parsing, so that’s what we do, even if native
      // implementations could be faster
      //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 ±    10 tzHH    11 tzmm
      if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(isoString))) {
        // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
        for (var i = 0, k;
        (k = numericKeys[i]); ++i) {
          struct[k] = +struct[k] || 0;
        }

        // allow undefined days and months
        struct[2] = (+struct[2] || 1) - 1;
        struct[3] = +struct[3] || 1;

        if (struct[8] !== 'Z' && struct[9] !== undefined) {
          minutesOffset = struct[10] * 60 + struct[11];

          if (struct[9] === '+') {
            minutesOffset = 0 - minutesOffset;
          }
        }

        timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
      }
      return timestamp;
    },


    /**
     * Prints the ISO 8601 time string.
     *
     * @param isoString {String} an ISO 8601 String.
     * @param withSeconds {Boolean} Whether seconds should be printed or not.
     * @return {String} time as string.
     */
    printIsoTime : function(isoString, withSeconds) {
      var timestamp = this.parseIsoString(isoString);
      return fs39exp.util.Date.printTime(timestamp, withSeconds);
    },


    /**
     * Prints the ISO 8601 date string.
     *
     * @param isoString {String} an ISO 8601 String.
     * @param shortYear {Boolean ? false} if true, the year will formatted as "yy", otherwise "yyyy".
     * @return {String} date as string.
     */
    printIsoDate : function(isoString, shortYear) {
      var timestamp = this.parseIsoString(isoString);
      return fs39exp.util.Date.printDate(timestamp, shortYear);
    },


    /**
     * Prints the ISO 8601 date and time string.
     *
     * @param isoString {String} an ISO 8601 date and time string.
     * @param shortYear {Boolean ? false} if true, the year will formatted as "yy", otherwise "yyyy".
     * @return {String} date as string.
     */
    printIsoDateTime : function(isoString, shortYear) {
      return fs39exp.util.Date.printIsoDate(isoString, shortYear) + " "+fs39exp.util.Date.printIsoTime(isoString);
    },


    /**
     * Prints the date and time of the given timestamp.
     * @param timestamp {Integer} a timestamp.
     * @return {String} date and time as string.
     */
    printDateTime : function(timestamp) {
      return fs39exp.util.Date.printDate(timestamp) + " "+fs39exp.util.Date.printTime(timestamp);
    },

    /**
     * Outputs a ISO 8601 date and time string in the way humans tend to use it:
     * If the ISO 8601 is within the current day, only the time will be printed.
     * If it's within the current week, the day of the week will be returned.
     * Otherwise it's simply the date.
     *
     * @param isoString {String} an ISO 8601 date and time string.
     * @return {String} the time, weekday or date.
     */
    printPrettyIsoDate : function(isoString)
    {
      return this.printPrettyDate(this.parseIsoString(isoString));
    },

    /**
     * Outputs a timestamp in the way humans tend to use it:
     * If the timestamp is within the current day, only the time will be printed.
     * If it's within the current week, the day of the week will be returned.
     * Otherwise it's simply the date.
     *
     * @param timestamp {Integer} a timestamp.
     * @return {String} the time, weekday or date.
     */
    printPrettyDate : function(timestamp)
    {
      var startToday = new Date().setHours(0,0,0,0);
      var startLastWeek = new Date(startToday - 60*60*24*7*1000);

      if(timestamp >= startToday) {
        return this.printTime(timestamp, false);
      }
      else if (timestamp >= startLastWeek)
      {
        var dayIndex = new Date(timestamp).getDay();
        var days = ["Sonntag", "Montag", "Dientag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        return days[dayIndex];
      }
      else {
        return this.printDate(timestamp, true);
      }
    }
  },


  defer : function(statics) {
    // If native Date.parse is capable to parse ISO 8601 string, use it.
    if(Date.parse("2013-05-19T00:00:00.000+02:00")) {
      statics.parseIsoString = Date.parse;
    }
  }
});