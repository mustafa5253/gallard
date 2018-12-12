export const RAW_MATERIAL = {
    GET : 'MasterApi/DsiplayRawMaterialList',
    ADD: 'MasterApi/AddRawMaterial?ItemName=:name',
    UPDATE: 'MasterApi/AddRawMaterial?STKUID=:stkId&ItemName=:name&UOMID=:uomId&ProudctID=:productId',
    DELETE: 'MasterApi/DeleteRawMaterialbyId?STKUID=:stkId'
}