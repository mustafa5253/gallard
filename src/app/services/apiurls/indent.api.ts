export const Indent_API = {
    ADD : 'MasterApi/AddIndent?RawMaterialId=:rawMaterialId&CategoryId=:categoryId&UOMID=:unitId&Quantity=:qty&Priority=:priority&HsnCode=:hsn&Gst=:gst&CreateDate=:date',
    GET: 'MasterApi/DisplayIndentList',
    DELETE: 'MasterApi/DeleteIndent?IndentId=:indentId'
};
