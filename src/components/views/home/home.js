import React from 'react'
import { connect } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import { requestProducts } from '../../../store/products/thunks'
import Button from '../../layout/styled-components/button'
import Title from '../../layout/styled-components/title'


class Home extends React.Component {
    
    componentDidMount() {
        const { requestProducts, auth } = this.props
        requestProducts(auth.user.auth_token);
    }
    
    render() {
        const { auth, products } = this.props

        return (
            <div>
                {
                    products.loading && 
                        <ClipLoader 
                            sizeUnit={"px"}
                            size={150}
                            color={'#fff000'} />
                }
                {console.log(products)}
                <Title>Bem vindo {auth.user.name}</Title>
                <Button red>Colors!</Button>
                <Button green>Colors!</Button>
                <Button>Colors!</Button>
                <Button yellow>Colors!</Button>
                {
                    products.list && products.list.map((p, index) => 
                        <div key={index}>
                            <h1>{p.item}</h1>
                            <h2>{p.sku}</h2>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    products: state.products
});

export default connect(mapStateToProps, {
    requestProducts
})(Home)