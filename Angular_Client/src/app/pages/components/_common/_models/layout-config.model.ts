export interface LayoutConfigModel {
	demo: string;
	self: {
		layout?: string; 
		body?: {
			'background-image'?: string,
			'class'?: string,
			'background-position'?: string,
			'background-size'?: string,
			font_size?: 'small'|'medium'|'large';
		};
		logo: any | string;
	};
	portlet?: {
		sticky: {
			offset: number
		}
	};
	loader: {
		enabled: boolean;
		type?: string | 'default' | 'spinner-message' | 'spinner-logo';
		logo?: string;
		message?: string;
	};
	colors: {
		state?: any;
		base: {
			label: string[];
			shape: string[]
		}
	};
	width?: string;
	header: {
		self: {
			skin?: string;
			width?: string;
			fixed: {
				desktop: any;
				mobile: boolean
			}
			font_size?: 'small'|'medium'|'large';
		};
		// not implemented yet
		topbar?: {
			self?: {
				width?: string;
				font_size?: 'small'|'medium'|'large';
			}
			search?: {
				display: boolean;
				layout: 'offcanvas' | 'dropdown';
				dropdown?: {
					style: 'light' | 'dark';
				}
			};
			notifications?: {
				display: boolean;
				layout: 'offcanvas' | 'dropdown';
				dropdown: {
					style: 'light' | 'dark';
				}
			};
			'quick-actions'?: {
				display: boolean;
				layout: 'offcanvas' | 'dropdown';
				dropdown: {
					style: 'light' | 'dark';
				}
			};
			user?: {
				display: boolean;
				layout: 'offcanvas' | 'dropdown';
				dropdown: {
					style: 'light' | 'dark';
				}
			};
			languages?: {
				display: boolean
			};
			cart?: {
				display: boolean
			};
			'my-cart'?: any
			'quick-panel'?: {
				display: boolean
			};
			'icon-style'?: 'default' | 'duotone';
			font_size?: 'small'|'medium'|'large';
		};
		search?: {
			display: boolean
		};
		menu?: {
			self: {
				display: boolean;
				layout?: string;
				'root-arrow'?: boolean;
				width?: string;
			};
			desktop: {
				arrow: boolean;
				toggle: string;
				submenu: {
					skin?: string;
					arrow: boolean
				}
			};
			mobile: {
				submenu: {
					skin: string;
					accordion: boolean
				}
			};
		}
	};
	brand?: {
		self: {
			skin: string
		}
	};
	aside?: {
		self: {
			skin?: string;
			display: boolean;
			fixed?: boolean | any;
			minimize?: {
				toggle: boolean;
				default: boolean
			};
			font_size?: 'small'|'medium'|'large';
		};
		footer?: {
			self: {
				display: boolean
			}
		};
		menu: {
			'root-arrow'?: boolean;
			dropdown: boolean;
			scroll: boolean;
			submenu: {
				accordion: boolean;
				dropdown: {
					arrow: boolean;
					'hover-timeout': number
				}
			};
			'icon-style'?: 'line' | 'bold' | 'solid' | 'duotone';
		}
	};
	'aside-secondary'?: {
		self: {
			display: boolean;
			layout?: string;
			expanded?: boolean;
		}
	};
	subheader?: {
		display: boolean;
		fixed?: boolean;
		width?: string;
		layout?: string;
		style?: 'light' | 'solid' | 'transparent';
		daterangepicker?: {
			display: boolean
		};
		font_size?: 'small'|'medium'|'large';
		clear?:boolean;
	};
	content?: {
		width?: string;
		font_size?: 'small'|'medium'|'large';
		"fit-top"?:boolean;
		font_weight?:'thin'|'medium'|'bold';
	};
	footer?: {
		self?: {
			width?: string;
			layout?:string;
			fixed?:boolean;
			font_size?: 'small'|'medium'|'large';
		};
	};
	'quick-panel'?: {
		display?: boolean
	};
	toolbar?: any;
	basic_layout?: {
		theme?:string;
		font_size?:string;
	};
}
