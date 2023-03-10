import React from 'react';
import { Text, Field, RichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { searchData } from '../pages/api';
import { GetStaticComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { useComponentProps, ComponentRendering } from '@sitecore-jss/sitecore-jss-nextjs';

type ProductData = {
  id: string;
  name: string;
  description: string;
  imageURL: string;
  currency: string;
  price: number;
  qty: number;
};

type PIMProductProps = {
  rendering: ComponentRendering;
  fields: {
    Heading: Field<string>;
    Body: Field<string>;
  };
};

export const Default = (props: PIMProductProps): JSX.Element => {
  const productExtData = useComponentProps<ProductData>(props.rendering.uid);
  return (
    <div>
      <Text field={props.fields.Heading} />
      <RichText field={props.fields.Body} />
      {productExtData ? (
        <div>
          <div className="pimproduct_left">
            <img src={productExtData.imageURL} alt={productExtData.name} />
          </div>
          <div className="pimproduct_right">
            <div>
              <p>{productExtData.description}</p>
            </div>
            <div>
              <p>
                {productExtData.price} {productExtData.currency}
              </p>
            </div>
            <div>
              <p>available: {productExtData.qty > 1 ? 'yes' : 'no'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <b>404: Product Not Found. </b>Please use an existing SKU!
          <br />
        </div>
      )}
    </div>
  );
};

//export const PIMProduct;

export const PIMProductList = (props: PIMProductProps): JSX.Element => {
  const productExtData = useComponentProps<ProductData>(props.rendering.uid);
  return (
    <div>
      <Text field={props.fields.Heading} />
      <RichText field={props.fields.Body} />
      {productExtData ? (
        <div>
          <div>
            <div>{productExtData.description}</div>
            <div>
              {productExtData.price} {productExtData.currency}
            </div>
            <div>available: {productExtData.qty > 1 ? 'yes' : 'no'}</div>
          </div>
        </div>
      ) : (
        <div>
          <b>404: Product Not Found. </b>Please use an existing SKU!
        </div>
      )}
    </div>
  );
};

//export default PIMProductList;

// micser: https://thetombomb.com/posts/component-level-data-fetching
export const getStaticProps: GetStaticComponentProps = async (rendering, _layoutData, context) => {
  try {
    const product_id_path = context?.params?.path || ['dummy'];
    const product_id = product_id_path[product_id_path.length - 1].toLowerCase();
    console.log('=====> PIMProduct process.env:', process.env.MICSER_TEST, process.env);

    console.log('=====> PIMProduct in getStaticProps:', context, rendering, product_id);
    if (product_id?.startsWith('product-')) {
      const CATALOG_URL =
        process.env.NEXT_PUBLIC_ARTICLE_CATALOG_URL || 'https://eoht68m1upivih8.m.pipedream.net';
      const PRODUCTS_TAG = 'products';
      const products = await searchData(CATALOG_URL, PRODUCTS_TAG, 'id', product_id);
      const product = products[0];
      console.log(
        '-----> PIMProduct getStaticProps URL and result:',
        process.env.NEXT_PUBLIC_ARTICLE_CATALOG_URL,
        CATALOG_URL,
        product
      );
      return product;
    }
  } catch (ex) {}
  return null;
};
// end
