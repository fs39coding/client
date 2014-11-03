qx.Class.define("fs39exp.model.Overview",
{
  include : [qx.event.MEmitter],

  properties:
  {
    allExpenses :
    {
      // An array with five elements for each weekday
      check : "qx.data.Array",
      event : "changeAllExpenses",
      init : null
    }
  },

  members :
  {
    update : function(resource)
    {
      var result = resource.rows.map(function(element) {
        return {
          amount : element.value.amount + " EUR",
          buyer : element.value.buyer,
          isCleared : element.value.isCleared,
          timestamp : fs39exp.util.Date.printPrettyIsoDate(element.value.timestamp),
          items : element.value.items.join(", ")
        }
      });
      this.allExpenses = new qx.data.Array(result);
    }
  }
});