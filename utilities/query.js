const getUserCartQuery = (id) => `
SELECT products.NAME AS 'name', (inventories.AMOUNT >= carts.QUANTITY)  AS 'isValid',
	colors.NAME AS 'color', colors.HEX AS 'hex', sizes.NAME AS 'size', carts.QUANTITY AS 'quantity',
    inventories.AMOUNT AS 'amount', json_arrayagg( images.URL) as 'images',
    inventories.ID AS 'inventoryId', products.ID AS 'productId', products.PRICE AS 'price'
FROM users, carts, inventories, products, sizes, colors, images
WHERE users.id = ${id} AND users.ID = carts.userId AND carts.INVENTORYID = inventories.ID
	AND products.ID = inventories.PRODUCTID AND sizes.ID = inventories.SIZEID 
    AND colors.ID = inventories.colorID AND images.PRODUCTID = products.ID
GROUP BY products.NAME, colors.NAME, colors.HEX, sizes.NAME, carts.QUANTITY, inventories.AMOUNT,
	inventories.ID
`

const getProductsQuery = ({ where, limit, offset, sort }) => `
select products.*, (
	select  json_arrayagg(url) from images where images.productId = products.id
) as 'images'  from products
 inner join inventories on products.id = inventories.productId
 ${where ? ` where ${where}` : ''}
 group by products.id 
 ${sort ? ` order by ${sort}` : ''}
 ${limit ? ` limit ${limit}` : ''}
 ${offset ? ` offset ${offset}` : ''}
`

const getProductsWithCountQuery = `
  select products.*, categories.name as 'categoryName', brands.name as 'brandName' , count(*) as 'count' from products
  left join inventories on inventories.productId = products.id
  left join brands on brands.id = products.brandId
  left join categories on categories.id = products.categoryId
  group by products.id
`

module.exports = {
	getUserCartQuery,
	getProductsQuery,
	getProductsWithCountQuery,
}
