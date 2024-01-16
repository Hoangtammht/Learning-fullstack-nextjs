import { ProductStyle } from "../styles/ProductStyle";
import Link from "next/link";


export default function Product({ product }) {
  const { title, price, image, description, slug } = product.attributes;

  return (
    <ProductStyle>
    <Link href={`/product/${slug}`}>
      <div>
        <img
          src={image.data[0]?.attributes?.formats?.thumbnail?.url}
          alt={title}
        />
      </div>
      <h2>{title}</h2>
      <h3>{price}</h3>
      </Link>
    </ProductStyle>
  );
}




