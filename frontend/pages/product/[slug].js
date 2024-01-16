import { useQuery } from "urql";
import { GET_PRODUCT_QUERY } from "@/lib/query";
import { useRouter } from "next/router";
import {
  DetailStyle,
  ProductInfo,
  Quantity,
  Buy,
} from "@/styles/ProductDetails";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import { useStateContext } from "@/lib/context";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function ProductionDetails() {
  const { qty, increateQty, decreateQty, onAdd, setQty } = useStateContext();

  useEffect(() => {
    setQty(1);
  }, []);

  const { query } = useRouter();

  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const { title, description, image } = data.products.data[0].attributes;

  const notify = () => {
    toast.success(`${title} added to your cart`, { duration: 1000 });
  };

  return (
    <DetailStyle>
      <img
        src={image.data[0]?.attributes?.formats?.thumbnail?.url}
        alt={title}
      />
      <ProductInfo>
        <h3>{title}</h3>
        <p>{description}</p>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreateQty}>
            <AiFillMinusCircle />
          </button>
          <p>{qty}</p>
          <button onClick={increateQty}>
            <AiFillPlusCircle />
          </button>
        </Quantity>
        <Buy
          onClick={() => {
            onAdd(data.products.data[0].attributes, qty);
            notify();
          }}
        >
          Add to cart
        </Buy>
      </ProductInfo>
    </DetailStyle>
  );
}
