import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DungChungService } from '../_services/dung-chung.service';

@Injectable()
export class FunctionPublic{
    static fixedPoint: number = 2;

    constructor(
		private dungChungService: DungChungService,
    ) {}
	
	/*Format Date-time */
    public static getFormatDate(v: string = '') {
		if (v != '') {
			return v.includes('T') ? v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})(T)(\d{2})(:)(\d{2})(:)(\d{2}).*$/g, "$5/$3/$1") : v.replace(/(\d{4})(-)(\d{2})(-)(\d{2})/g, "$5/$3/$1");
		}
		return '';
	}
	public static getCurrentDate() {
		var date = new Date();
		return this.addZero(date.getMonth() + 1) + "/" + this.addZero(date.getDate()) + "/" + date.getFullYear();
	}
	public static getFirstDateInMonth() {
		var date = new Date();
		return this.addZero(date.getMonth() + 1) + "/01/" + date.getFullYear();
	}
	static getCurrentDateTime() {
		var date = new Date();
		return date.getFullYear() + this.addZero(date.getMonth() + 1) + this.addZero(date.getDate()) + this.addZero(date.getHours()) + this.addZero(date.getMinutes()) + this.addZero(date.getSeconds());
	}
	static getFullYear() {
		var date = new Date();
		return date.getFullYear();
	}
	static addZero(e) {
		return e < 10 ? '0' + e : '' + e;
	}

	public static setMinMaxDate(value: string) {
		return {
			year: new Date(value).getFullYear(),
			month: new Date(value).getMonth() + 1,
			day: new Date(value).getDate()
		}
	}
	/*Format number */
	public static F_NUMBER(item: any){	
		const regex_c2n = /[-]?[0-9]{1,3}(?:\.?[0-9]{3})*,[0-9]{2}$/g;
		const regex_n2c = /^[-]?[0-9]{1,3}([0-9]{3})*(\.[0-9]{1,2})?$/g;
		const regex_c2c = /[-]?[0-9]{1,3}([0-9]{3})*,[0-9]{3,}/g; // Nhiều hơn 2 số thập phân
		const regex_n2nM = /[-]?[0-9]{1,3}([0-9]{3})*\.[0-9]{3,}$/g; // -4.949999999 = -4.95
		if(item == null || item == undefined || item.toString().trim() == "") return item;
		
		if(item.toString() && item.toString().match(regex_n2nM) != null){
			item = Number(item).toFixed(this.fixedPoint);
		}

		if(item.toString() && item.toString().match(regex_c2n) != null){
			return this.formatComparenumber(item.toString()).toFixed(this.fixedPoint);
		}

		if(item.toString() && item.toString().match(regex_n2c) != null){
			return this.f_currency_VND(this.formatNumber(item.toString()));
		}

		if(item.toString() && item.toString().match(regex_c2c) != null){
			let n1: any = this.formatComparenumber(item.toString());
			n1 = Number(n1).toFixed(this.fixedPoint);
			return this.f_currency_VND(this.formatNumber(n1.toString()));
		}

		return item;
	}
	public static f_currency(value: string): any {
		if (value == '-1') return '';
		if (value == null || value == undefined || value == '') value = '0';
		let nbr = Number((value + '').replace(/,/g, ""));
		return (nbr + '').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	private static formatComparenumber(number: string){
		return +number.replace(/\./g, "").replace(/,/g, ".");
	}
	private static f_currency_VND(value: string): any {
		if (value == null || value == undefined) return '0,00';
		return new Intl.NumberFormat('de-DE',{ style: 'decimal', currency: 'VND', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(value));
	}
	private static formatNumber(item: string){
		if(item == '' || item == null || item == undefined)	return '';
		return Number(Math.round(parseFloat(item + 'e' + this.fixedPoint)) + 'e-'+ this.fixedPoint).toFixed(this.fixedPoint);
	}

	/*Keydown Event */
	public static preventAlpha(event) {
		let pCurrent = event.target.selectionStart;
		let pStart = ((pCurrent - 3) >= 0) ? (pCurrent - 3) : 0;
		let pEnd = ((pCurrent + 3) >= event.target.value.length) ? (pCurrent + 3) : event.target.value.length;
		if (event.key == ' ') { event.preventDefault(); }
		if (event.which == 32) { event.preventDefault(); }

		// Chặn nhập "," khi chưa có dữ liệu hoặc nhập "," ở vị trí đầu của số
		if (event.key == ',' && event.target.value[event.target.selectionStart] == ',') { event.target.selectionStart += 1; event.target.selectionEnd = event.target.selectionStart }

		if (event.key == ',' && (event.target.value.length == 0 || pCurrent == 0)) { event.preventDefault(); }

		// Chặn khi phía trước hoặc phía sau đã có "," và cách nhau khác 3 chữ số
		if (event.key == '.'
			&& ((event.target.value.substring(pStart, pCurrent).includes('.'))
				|| (event.target.value.substring(pCurrent, pEnd).includes('.'))
			)) { event.preventDefault(); }

		if (event.key == '.'
			&& ((event.target.value.substring(0, pCurrent).includes('.'))
				|| (event.target.value.substring(pCurrent, pEnd).includes('.'))
			)) { event.preventDefault(); }

		// Chặn khi "." trước dấu "," và ngược lại
		if ((event.key == '.' && event.target.value.substring(0, pCurrent).includes(','))
			|| (event.key == ',' && event.target.value.substring(pCurrent).includes('.'))) { event.preventDefault(); }


		//if (event.key == ',' && event.target.value.length > 0){ return; }

		if ((event.key == '.' && (event.target.value.includes('.') || event.target.value.includes(',')))
			|| (event.key == '-')
			|| (event.key == ',' && (event.target.value.includes(',')))
		) { event.preventDefault(); return; }

		if (event.keyCode === 46 || event.keyCode === 37 || event.keyCode === 39 || event.keyCode === 8 || event.keyCode === 9) { return; }

		if (isNaN(event.key) && !event.ctrlKey && event.key !== '.' && event.key !== ',') { event.preventDefault(); }

		if (event.key == '.' || event.key == ',') { return; }

		var regex = /[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/g;

		var found = event.key.match(regex);

		if (found != null && !event.ctrlKey) {
			event.preventDefault();
			return;
		}
	}
	/*Validate FormControl */
	public static ValidateFormGroupEvent(controlName: string, formGroup: FormGroup, type: number, validation: string = '') {
		if (formGroup == null || formGroup == undefined || controlName == null || controlName == '') return false;
		switch (type) {
			case 0:
				return this.isControlValid(controlName, formGroup);
			case 1:
				return this.isControlInvalid(controlName, formGroup);
			case 2:
				return this.isControlTouched(controlName, formGroup);
			case 3:
				return this.controlHasError(controlName, formGroup, validation);
		}
	}
	private static isControlValid(controlName: string, formGroup: FormGroup): boolean {
		const control = formGroup.controls[controlName];
		return control.valid && (control.dirty || control.touched);
	}
	private static isControlInvalid(controlName: string, formGroup: FormGroup): boolean {
		const control = formGroup.controls[controlName];
		return control.invalid && (control.dirty || control.touched);
	}
	private static isControlTouched(controlName, formGroup: FormGroup): boolean {
		const control = formGroup.controls[controlName];
		return control.dirty || control.touched;
	}
	private static controlHasError(controlName: string, formGroup: FormGroup, validation: string): boolean {
		const control = formGroup.controls[controlName];
		return control.hasError(validation) && (control.dirty || control.touched);
	}

	/*Chuyển tiếng Việt có dấu sang không dấu */
	public static removeVietnameseTones(str) {
		str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
		str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
		str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
		str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
		str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
		str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
		str = str.replace(/đ/g,"d");
		str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
		str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
		str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
		str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
		str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
		str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
		str = str.replace(/Đ/g, "D");
		// Some system encode vietnamese combining accent as individual utf-8 characters
		// Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
		str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
		str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
		// Remove extra spaces
		// Bỏ các khoảng trắng liền nhau
		str = str.replace(/ + /g," ");
		str = str.trim();
		// Remove punctuations
		// Bỏ dấu câu, kí tự đặc biệt
		str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
		return str;
	}
}