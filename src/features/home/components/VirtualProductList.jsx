import { Grid } from "react-window";
import ProductCard from "./ProductCard";

function ProductCell({ columnIndex, style, products }) {
  const product = products[columnIndex];
  return (
    <div style={style} className="px-2">
      <ProductCard product={product} />
    </div>
  );
}

export default function VirtualProductList({ products }) {
  const CARD_WIDTH = 220;
  const GAP = 16;
  const CARD_HEIGHT = 320;

  return (
    <Grid
      columnCount={products.length}
      columnWidth={CARD_WIDTH + GAP}
      rowCount={1}
      rowHeight={CARD_HEIGHT}
      cellComponent={ProductCell}
      cellProps={{ products }}
      overscanCount={2}
      className="scrollbar-hide"
      style={{ height: CARD_HEIGHT + 20 }}
    />
  );
}
