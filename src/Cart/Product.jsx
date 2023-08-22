function Product({ product, addToCart }) {
    return (
        <a href="#" className="list-group-item list-group-item-action" onClick={(e) => {
            e.preventDefault();
            addToCart(product)
        }}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{product.name}</h5>
                <small>${product.price}</small>
            </div>
            <p className="mb-1">{product.description}</p></a>
    )
}

export default Product;