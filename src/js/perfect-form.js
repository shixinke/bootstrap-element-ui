function perfectForm() {

}

function inputNumber(options) {
    var opt = {};
    if (typeof options == 'string') {
        opt.element = options;
    } else if (typeof options == 'object') {
        opt = options;
    }
    this.init(opt);
}

inputNumber.prototype = {
    options:{},
    init:function(options) {
        this.options.element = options.element ? $(options.element) : $('.input-number-box');
        this.options.inputElement = this.options.element.find(':input');
        this.options.plusElement = this.options.element.find('.input-number-increase');
        this.options.minusElement = this.options.element.find('.input-number-decrease');
        var min = this.options.inputElement.prop('min');
        var max =  this.options.inputElement.prop('max');
        if (min) {
            this.options.min = parseInt(min);
        }
        if (max) {
            this.options.max = parseInt(max);
        }
    },
    run:function() {
        var _this = this;
        _this.options.plusElement.not('.input-number-icon-disabled').on('click', function(){
            var value = _this.getValue(0);
            if (this.options.max && value < this.options.max) {
                value++;
                _this.options.inputElement.val(value);
            } else {
                $(this).addClass('input-number-icon-disabled')
            }

        });
        _this.options.minusElement.not('.input-number-icon-disabled').on('click', function(){
            var value = _this.getValue(0);
            if (this.options.min && value > this.options.min) {
                value--;
                _this.options.inputElement.val(value);
                _this.options.inputElement.val(value);
            } else {
                $(this).addClass('input-number-icon-disabled')
            }

        });
    },
    getValue:function(defaultValue) {
        var val =  this.options.inputElement.val();
        if (val) {
            val = parseInt(val);
        } else if (defaultValue) {
            val = defaultValue;
        }
        return val;
    }
};

perfectForm.prototype = {
    init : function() {

    },
    inputNumber:function(options) {

    }
};