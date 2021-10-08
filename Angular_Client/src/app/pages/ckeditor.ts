import ClassicEditorBase from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import Autoformat from "@ckeditor/ckeditor5-autoformat/src/autoformat.js";
import BlockQuote from "@ckeditor/ckeditor5-block-quote/src/blockquote.js";
import Bold from "@ckeditor/ckeditor5-basic-styles/src/bold.js";
import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder.js";
import CKFinderUploadAdapter from "@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js";
import Heading from "@ckeditor/ckeditor5-heading/src/heading.js";
import Image from "@ckeditor/ckeditor5-image/src/image.js";
import ImageCaption from "@ckeditor/ckeditor5-image/src/imagecaption.js";
import ImageStyle from "@ckeditor/ckeditor5-image/src/imagestyle.js";
import ImageToolbar from "@ckeditor/ckeditor5-image/src/imagetoolbar.js";
import ImageUpload from "@ckeditor/ckeditor5-image/src/imageupload.js";
import Indent from "@ckeditor/ckeditor5-indent/src/indent.js";
import Italic from "@ckeditor/ckeditor5-basic-styles/src/italic.js";
import Link from "@ckeditor/ckeditor5-link/src/link.js";
import List from "@ckeditor/ckeditor5-list/src/list.js";
import MediaEmbed from "@ckeditor/ckeditor5-media-embed/src/mediaembed.js";
import PasteFromOffice from "@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice";
import Table from "@ckeditor/ckeditor5-table/src/table.js";
import TableToolbar from "@ckeditor/ckeditor5-table/src/tabletoolbar.js";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment.js";
import FontColor from "@ckeditor/ckeditor5-font/src/fontcolor.js";
import FontSize from "@ckeditor/ckeditor5-font/src/fontsize.js";
import FontFamily from "@ckeditor/ckeditor5-font/src/fontfamily.js";
import FontBackgroundColor from "@ckeditor/ckeditor5-font/src/fontbackgroundcolor.js";
import Highlight from "@ckeditor/ckeditor5-highlight/src/highlight.js";
import HorizontalLine from "@ckeditor/ckeditor5-horizontal-line/src/horizontalline.js";
// import PageBreak from '@ckeditor/ckeditor5-page-break/src/pagebreak.js';
import TableCellProperties from "@ckeditor/ckeditor5-table/src/tablecellproperties";
import TableProperties from "@ckeditor/ckeditor5-table/src/tableproperties";
import TodoList from "@ckeditor/ckeditor5-list/src/todolist";
import Underline from "@ckeditor/ckeditor5-basic-styles/src/underline.js";
// import WordCount from '@ckeditor/ckeditor5-word-count/src/wordcount.js';
import Essentials from "@ckeditor/ckeditor5-essentials/src/essentials.js";
import Paragraph from "@ckeditor/ckeditor5-paragraph/src/paragraph.js";

export default class ClassicEditor extends ClassicEditorBase {}

// ClassicEditor.builtinPlugins = [
//   //   Youtube,
//   Autoformat,
//   BlockQuote,
//   Bold,
//   CKFinder,
//   CKFinderUploadAdapter,
//   Heading,
//   Image,
//   ImageCaption,
//   ImageStyle,
//   ImageToolbar,
//   ImageUpload,
//   Indent,
//   Italic,
//   Link,
//   List,
//   MediaEmbed,
//   PasteFromOffice,
//   Table,
//   TableToolbar,
//   Alignment,
//   FontColor,
//   FontSize,
//   FontFamily,
//   FontBackgroundColor,
//   Highlight,
//   HorizontalLine,
//   //   PageBreak,
//   TableCellProperties,
//   TableProperties,
//   TodoList,
//   Underline,
//   //   WordCount,
//   Essentials,
//   Paragraph,
// ];
// Editor configuration.
// ClassicEditor.defaultConfig = {
//   toolbar: {
//     items: [
//       "heading",
//       "|",
//       "alignment", // <--- ADDED
//       "bold",
//       "italic",
//       "link",
//       "bulletedList",
//       "numberedList",
//       "uploadImage",
//       "blockQuote",
//       "undo",
//       "redo",
//     ],
//   },
//   image: {
//     toolbar: [
//       "imageStyle:inline",
//       "imageStyle:block",
//       "imageStyle:side",
//       "|",
//       "toggleImageCaption",
//       "imageTextAlternative",
//     ],
//   },
//   This value must be kept in sync with the language defined in webpack.config.js.
//   language: "en",
// };
