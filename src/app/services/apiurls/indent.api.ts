export const Indent_API = {
    ADD : 'MasterApi/AddIndent',
    GET: 'MasterApi/DisplayIndentList',
    DELETE: 'MasterApi/DeleteIndent?IndentId=:indentId',
    GENERATE_PO: 'MasterApi/CreatePO',
    GET_PO: 'MasterApi/DisplayPOList',
    CREATE_GRN: 'MasterApi/CreateGRN',
    SEARCH_PO_NUMBER: 'MasterApi/SearchPoNumber?PoNumber=:number',
    GENERATE_GRN: 'MasterApi/CreateGRN',
    GET_MATERIAL_HISTORY: 'MasterApi/GetPriceHistory?RawMaterialId=:id'

};

export const Inventory_API = {
	ISSUE_ITEM: 'MasterApi/IssueItem',
	GET_ISSUED_ITEM: 'MasterApi/DisplayIssueList',
	GET_STOCK_LIST: 'MasterApi/DisplayStockList'
}