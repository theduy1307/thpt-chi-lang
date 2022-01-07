#pragma checksum "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b65ab57492031d272106d96821dd6c73cea96dcb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Print_index), @"mvc.1.0.view", @"/Views/Print/index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b65ab57492031d272106d96821dd6c73cea96dcb", @"/Views/Print/index.cshtml")]
    public class Views_Print_index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<APICore_SoanDeThi.Models.InteractionModels.IBaiKiemTra_Print>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<!DOCTYPE html>\r\n<html lang=\"vi\">\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b65ab57492031d272106d96821dd6c73cea96dcb2764", async() => {
                WriteLiteral("\r\n    <meta charset=\"UTF-8\" />\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n    <title>BÀI KIỂM TRA</title>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 12pt;
        line-height: 1.5;
        letter-spacing: 1px;
    }

    .info,
    .title {
        width: 100%;
    }

    .title {
        text-align: center;
        border: none;
    }

        .title td {
            vertical-align: top;
        }

    .info {
        vertical-align: center;
    }

    .info__student {
        text-align: left;
    }

    .info__code {
        text-align: center;
    }

    .info__frame {
        border: solid 1px;
    }

    .question {
        width: 100%;
    }

    table.answer,
    table.answer th,
    table.answer td {
        border: 1px solid black;
        border-collapse: collapse;
        padding: 2pt 20px;
    }

    table.quiz-table {
        margin: 20px auto;
        width: 100%;  
    }

        table.quiz-table,
        table.quiz-table tr {
            border: 1px solid black;
           ");
            WriteLiteral(" border-collapse: collapse;\r\n        }\r\n\r\n            table.quiz-table td {\r\n                padding: 0 7px;\r\n            }\r\n\r\n    .dot {\r\n        font-size: 20pt;\r\n    }\r\n}\r\n</style>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "b65ab57492031d272106d96821dd6c73cea96dcb5211", async() => {
                WriteLiteral("\r\n");
#nullable restore
#line 83 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
     foreach (var item in Model.DanhSachBaiKiemTra)
    {

#line default
#line hidden
#nullable disable
                WriteLiteral(@"        <div>
            <table class=""title"">
                <tr>
                    <td>
                        SỞ GD-ĐT AN GIANG <br />
                        <strong>TRƯỜNG THPT CHI LĂNG</strong>
                    </td>
                    <td>
                        <strong style=""text-transform: uppercase"">ĐỀ KIỂM TRA ");
#nullable restore
#line 93 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                         Write(Html.DisplayFor(model => model.TenBaiKiemTra));

#line default
#line hidden
#nullable disable
                WriteLiteral(", NĂM HỌC ");
#nullable restore
#line 93 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                                                                 Write(Model.NamHoc);

#line default
#line hidden
#nullable disable
                WriteLiteral("</strong> <br />\r\n                        <p style=\"text-transform: uppercase\">MÔN ");
#nullable restore
#line 94 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                            Write(Model.MonHoc);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - KHỐI ");
#nullable restore
#line 94 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                 Write(Model.Lop);

#line default
#line hidden
#nullable disable
                WriteLiteral("<br /></p>\r\n                        <i>Thời gian làm bài: ");
#nullable restore
#line 95 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                         Write(Model.ThoiGianLamBai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" phút, không kể thời gian phát đề</i>
                        <hr style=""margin: auto"" width=""50%"" />
                    </td>
                </tr>
            </table>
            <table class=""info"">
                <tr>
                    <td class=""info__student"">
                        Họ và tên: ................................................. <br />
                        Lớp: ..........................................................
                    </td>
                    <td class=""info__code"">
                        <div class=""info__frame"">
                            <strong>Mã đề thi: ");
#nullable restore
#line 108 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                          Write(item.MaDe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</strong>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </table>\r\n");
#nullable restore
#line 149 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
              
                double totalCountTitle = item.DanhSachCauHoi.Count();
                int totalColTitle = Convert.ToInt32(Math.Round((totalCountTitle / 10)));
            

#line default
#line hidden
#nullable disable
                WriteLiteral("            <table class=\"page\" style=\"width:100%\">\r\n                <tr>\r\n");
#nullable restore
#line 155 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                      
                        int idx = 0;
                        

#line default
#line hidden
#nullable disable
#nullable restore
#line 157 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                         for (int i = 1; i < totalColTitle + 1; i++)
                        {

#line default
#line hidden
#nullable disable
                WriteLiteral(@"                            <td>
                                <table class=""quiz-table"">
                                    <tr>
                                        <td>#</td>
                                        <td>A</td>
                                        <td>B</td>
                                        <td>C</td>
                                        <td>D</td>
                                    </tr>
");
#nullable restore
#line 168 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                     for (int j = 0; j < 10; j++)
                                    {

#line default
#line hidden
#nullable disable
                WriteLiteral("                                        <tr>\r\n                                            <td>");
#nullable restore
#line 171 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                            Write((j+1)+idx);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</td>
                                            <td class=""dot"">&#9675;</td>
                                            <td class=""dot"">&#9675;</td>
                                            <td class=""dot"">&#9675;</td>
                                            <td class=""dot"">&#9675;</td>
                                        </tr>
");
#nullable restore
#line 177 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                    }

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </table>\r\n                            </td>\r\n");
#nullable restore
#line 181 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                            idx += 10;
                        }

#line default
#line hidden
#nullable disable
                WriteLiteral("                </tr>\r\n            </table>\r\n\r\n            <table class=\"question\">\r\n");
#nullable restore
#line 188 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                 foreach (var cauhoi in item.DanhSachCauHoi.Select((value, i) => new { value, i }))
                {
                    var value = cauhoi.value;
                    var index = cauhoi.i + 1;


#line default
#line hidden
#nullable disable
                WriteLiteral("                    <tbody>\r\n                        <tr>\r\n                            <td colspan=\"4\">\r\n                                <strong>Câu ");
#nullable restore
#line 196 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                       Write(index);

#line default
#line hidden
#nullable disable
                WriteLiteral(": </strong>\r\n                                ");
#nullable restore
#line 197 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                           Write(Html.Raw(value.TieuDe));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                            </td>\r\n                        </tr>\r\n");
#nullable restore
#line 200 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                         if (value.CauA.Split(" ").Count() < 5 && value.CauB.Split(" ").Count() < 5 && value.CauC.Split(" ").Count() < 5 && value.CauD.Split(" ").Count() < 5)
                        {

#line default
#line hidden
#nullable disable
                WriteLiteral("                            <tr>\r\n                                <td>\r\n                                    <strong>A. </strong>\r\n                                    ");
#nullable restore
#line 205 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauA));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                                <td>\r\n                                    <strong>B. </strong>\r\n                                    ");
#nullable restore
#line 209 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauB));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                                <td>\r\n                                    <strong>C. </strong>\r\n                                    ");
#nullable restore
#line 213 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauC));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                                <td>\r\n                                    <strong>D. </strong>\r\n                                    ");
#nullable restore
#line 217 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauD));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                            </tr>\r\n");
#nullable restore
#line 220 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                        }
                        else
                        {

#line default
#line hidden
#nullable disable
                WriteLiteral("                            <tr>\r\n                                <td colspan=\"4\">\r\n                                    <strong>A. </strong>\r\n                                    ");
#nullable restore
#line 226 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauA));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td colspan=\"4\">\r\n                                    <strong>B. </strong>\r\n                                    ");
#nullable restore
#line 232 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauB));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td colspan=\"4\">\r\n                                    <strong>C. </strong>\r\n                                    ");
#nullable restore
#line 238 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauC));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td colspan=\"4\">\r\n                                    <strong>D. </strong>\r\n                                    ");
#nullable restore
#line 244 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                               Write(Html.Raw(value.CauD));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                                </td>\r\n                            </tr>\r\n");
#nullable restore
#line 247 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                        }

#line default
#line hidden
#nullable disable
                WriteLiteral("                    </tbody>\r\n");
#nullable restore
#line 249 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                }

#line default
#line hidden
#nullable disable
                WriteLiteral("            </table>\r\n        </div>\r\n        <div style=\"page-break-after: always\"></div>\r\n");
#nullable restore
#line 253 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
    }

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n");
#nullable restore
#line 255 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
     foreach (var item in Model.DanhSachBaiKiemTra)
    {
        
            double totalCountTitle = item.DanhSachCauHoi.Count();
            int totalColTitle = Convert.ToInt32(Math.Round((totalCountTitle / 10)));        

#line default
#line hidden
#nullable disable
                WriteLiteral("        <h1>BẢNG ĐÁP ÁN ĐỀ ");
#nullable restore
#line 260 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                      Write(item.MaDe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</h1>\r\n        <table class=\"page\" style=\"width:100%\">\r\n            <tr>\r\n");
#nullable restore
#line 263 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                  
                    int idx = 0;
                    

#line default
#line hidden
#nullable disable
#nullable restore
#line 265 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                     for (int i = 1; i < totalColTitle + 1; i++)
                    {

#line default
#line hidden
#nullable disable
                WriteLiteral(@"                        <td>
                            <table class=""quiz-table"">
                                <tr>
                                    <td>#</td>
                                    <td>A</td>
                                    <td>B</td>
                                    <td>C</td>
                                    <td>D</td>
                                </tr>
");
#nullable restore
#line 276 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                 for (int j = 0; j < 10; j++)
                                {
                                    var _addressQuestion = item.DanhSachCauHoi.ElementAtOrDefault((j + idx));
                                    if(_addressQuestion != null)
                                    {

#line default
#line hidden
#nullable disable
                WriteLiteral("                                        <tr>\r\n                                            <td>");
#nullable restore
#line 282 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                            Write((j + 1) + idx);

#line default
#line hidden
#nullable disable
                WriteLiteral("</td>\r\n");
#nullable restore
#line 283 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                             if (_addressQuestion.CauDung == 1)
                                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("<td class=\"dot\">&#9679;</td>");
#nullable restore
#line 284 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                         } else {

#line default
#line hidden
#nullable disable
                WriteLiteral(" <td class=\"dot\">&#9675;</td>");
#nullable restore
#line 284 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                                              }

#line default
#line hidden
#nullable disable
#nullable restore
#line 285 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                             if (_addressQuestion.CauDung == 2)
                                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("<td class=\"dot\">&#9679;</td>");
#nullable restore
#line 286 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                         } else {

#line default
#line hidden
#nullable disable
                WriteLiteral(" <td class=\"dot\">&#9675;</td>");
#nullable restore
#line 286 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                                              }

#line default
#line hidden
#nullable disable
#nullable restore
#line 287 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                             if (_addressQuestion.CauDung == 3)
                                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("<td class=\"dot\">&#9679;</td>");
#nullable restore
#line 288 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                         } else {

#line default
#line hidden
#nullable disable
                WriteLiteral(" <td class=\"dot\">&#9675;</td>");
#nullable restore
#line 288 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                                              }

#line default
#line hidden
#nullable disable
#nullable restore
#line 289 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                             if (_addressQuestion.CauDung == 4)
                                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("<td class=\"dot\">&#9679;</td>");
#nullable restore
#line 290 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                         } else {

#line default
#line hidden
#nullable disable
                WriteLiteral(" <td class=\"dot\">&#9675;</td>");
#nullable restore
#line 290 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                                                                                              }

#line default
#line hidden
#nullable disable
                WriteLiteral("                                        </tr>\r\n");
#nullable restore
#line 292 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                    }
                                    else
                                    {

#line default
#line hidden
#nullable disable
                WriteLiteral("                            <tr>\r\n                                <td>");
#nullable restore
#line 296 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                Write((j + 1) + idx);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</td>
                                <td class=""dot"">&#9675;</td>
                                <td class=""dot"">&#9675;</td>
                                <td class=""dot"">&#9675;</td>
                                <td class=""dot"">&#9675;</td>
                            </tr>
");
#nullable restore
#line 302 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                                    }

                                }

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                            </table>\r\n                        </td>\r\n");
#nullable restore
#line 308 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
                        idx += 10;
                    }

#line default
#line hidden
#nullable disable
                WriteLiteral("            </tr>\r\n        </table>\r\n        <div style=\"page-break-after: always\"></div>\r\n");
#nullable restore
#line 314 "D:\ChiLang\thpt-chi-lang\APICore_SoanDeThi\Views\Print\index.cshtml"
    }

#line default
#line hidden
#nullable disable
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<APICore_SoanDeThi.Models.InteractionModels.IBaiKiemTra_Print> Html { get; private set; }
    }
}
#pragma warning restore 1591
