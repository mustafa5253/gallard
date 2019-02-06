export const Indent_API = {
    ADD : 'MasterApi/AddIndent',
    UPDATE : 'MasterApi/EditIndent',    
    GET: 'MasterApi/DisplayIndentList',
    DELETE: 'MasterApi/DeleteIndent?IndentId=:indentId',
    GENERATE_PO: 'MasterApi/CreatePO',
    GET_PO: 'MasterApi/DisplayPOList',
    CREATE_GRN: 'MasterApi/CreateGRN',
    SEARCH_PO_NUMBER: 'MasterApi/DisplayPOListbyPoNumber?PoNumber=:number',
    GENERATE_GRN: 'MasterApi/CreateGRN',
    GET_PRICE_HISTORY: 'MasterApi/GetPriceHistory?RawMaterialId=:id',
    GET_INDENT_HISTORY: 'MasterApi/DisplayIndentHistoryList?MaterialId=:id',
    DELETE_MULTIPLE_INDENT: 'MasterApi/DeleteMultipleIndentbyId?IndentList=:indentId',
    GET_PO_BY_NUMBER: 'MasterApi/DisplayPONumber?PoNumber=:number',
    UPDATE_PO: 'MasterApi/EditPONumber',
    DELETE_PO_INDENT: 'MasterApi/DeletePOItem?IndentId=:indentId'
};

export const Inventory_API = {
	ISSUE_ITEM: 'MasterApi/IssueItem',
	GET_ISSUED_ITEM: 'MasterApi/DisplayIssueList',
	GET_STOCK_LIST: 'MasterApi/DisplayStockList'
}