import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./CardProduct.css";
import { Link,Switch,Route } from "react-router-dom";

export default function MediaCard(props) {
  const styles = {
    card: {
      width: 200,
      textAlign: "center",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      width: "100%",
    },
    media: {
      textAlign: "center",
      display: "block",
      justifyContent: "center",
      alignItems: "center",
      margin: "auto",
      width: "100%",
    },
  };
  function getProductLink() {
    return "/product/" + product.id;
  }
  const product = props.product;
  return (
    <div className="productCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          style={styles.card}
          image={
            product.img === ""
              ? "https://ecdn.game4v.com/g4v-content/uploads/2021/11/24141024/h%C3%ACnh-%E1%BA%A3nh_2021-11-24_141021-1637737822-1.png"
              : product.img
          }
          alt={product.name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              width: 250,
              height: 100,
              textAlign: "center",
              fontStyle: "semiBold",
              verticalAlign: "center",
            }}
          >
            {product.name}
          </Typography>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              width: 250,
              height: 50,
              textAlign: "center",
              fontStyle: "Bold",
            }}
          >
            {product.price + " VNĐ"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.priceIN}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Mua</Button>
          <Button size="small" as={Link} to={getProductLink()}>
            <Link to="/modus-create">Modus Create</Link>
            <Switch>
              <Route path="/:id" children={<detailProduct id={product.id} />} />
            </Switch>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
