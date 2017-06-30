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
        var step = this.options.inputElement.prop('step');
        this.options.defaultValue = 1;
        this.options.max = max && parseInt(max);
        this.options.step = step ? parseInt(step) : 1;
        if (min) {
            this.options.min = parseInt(min);
            this.options.defaultValue = min;
            if (!this.getValue()) {
                this.options.inputElement.val(min);
                this.options.minusElement.addClass('input-number-icon-disabled');
            }
        }
    },
    run:function() {
        var _this = this;
        _this.options.plusElement.on('click', function(){
            var value = _this.getValue(0);
            if ($(this).hasClass('input-number-icon-disabled')) {
                return;
            }
            if (_this.options.max && value < _this.options.max && (value <= _this.options.max - _this.options.step)) {
                value += _this.options.step;
                _this.options.inputElement.val(value);
            }
            _this.checkStatus();
        });
        _this.options.minusElement.on('click', function(){
            var value = _this.getValue(0);
            if ($(this).hasClass('input-number-icon-disabled')) {
                return;
            }
            if (_this.options.min && value > _this.options.min && ( value >= _this.options.min + _this.options.step)) {
                value -= _this.options.step;
                _this.options.inputElement.val(value);
            }
            _this.checkStatus();
        });
        _this.options.inputElement.on('keyup', function(){
            var value = _this.getValue();
            if (isNaN(value)) {
                $(this).val(_this.options.defaultValue);
            } else {
                _this.checkStatus();
            }

        })
    },
    getValue:function(defaultValue) {
        var val =  this.options.inputElement.val();
        if (val) {
            val = parseInt(val);
        } else if (defaultValue) {
            val = defaultValue;
        }
        return val;
    },
    checkStatus:function() {
        var _this = this;
        var value = this.getValue();
        if (_this.options.min && _this.options.min >= value) {
            _this.options.minusElement.addClass('input-number-icon-disabled');
            _this.options.inputElement.val(_this.options.min);

        } else {
            _this.options.minusElement.removeClass('input-number-icon-disabled');
        }
        if (_this.options.max && _this.options.max <= value) {
            _this.options.plusElement.addClass('input-number-icon-disabled');
            _this.options.inputElement.val(_this.options.max);

        } else {
            _this.options.plusElement.removeClass('input-number-icon-disabled');
        }
    }
};

perfectForm.prototype = {
    init : function() {

    },
    inputNumber:function(options) {

    }
};