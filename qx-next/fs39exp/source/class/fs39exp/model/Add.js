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
      check : "String",
      event : "changeItems",
      init : null
    },

    amount : 
    {
      check : "Number",
      event : "changeAmount",
      init : null
    }
  },

  members :
  {
    update : function(buyer, items, amount)
    {
      this.buyer = buyer;
      this.items = items;
      this.amount = amount;
    }
  }
});