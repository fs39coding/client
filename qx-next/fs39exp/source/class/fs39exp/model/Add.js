qx.Class.define("fs39exp.model.Add",
{
  include : [qx.event.MEmitter],

  properties:
  {
    buyer :
    {
      check : ["Gabriel", "Andreas"],
      event : "changeBuyer",
      init : null
    },


    items :
    {
      check : "Array",
      event : "changeItems",
      init : null
    },

    amount : 
    {
      check : "Number",
      event : "changeAmount",
      init : null
    },

    timestamp :
    {
      check : "String",
      event : "changeTimestamp",
      init : null
    }
  },

  members :
  {
    update : function(buyer, items, amount)
    {
      var now = new Date();
      
      this.buyer = buyer;
      this.items = items;
      this.amount = amount;
      this.timestamp = now.toJSON();
    }
  }
});