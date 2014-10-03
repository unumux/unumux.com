var console=console||{"log":function(){}};
document.createElement('ng-include');
document.createElement('ng-view');

// Optionally these for CSS
document.createElement('ng:include');
document.createElement('ng:view');


if (!Array.prototype.filter)
{
	Array.prototype.filter = function(fun /*, thisp*/)
	{
		var len = this.length;
		if (typeof fun != "function")
			throw new TypeError();

		var res = new Array();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
			if (i in this)
			{
              var val = this[i]; // in case fun mutates this
              if (fun.call(thisp, val, i, this))
              	res.push(val);
          }
      }

      return res;
  };
}


window.ie8 = true;
