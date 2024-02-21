import slide1 from "../../images/detail-item-slide1.png";
import slide2 from "../../images/detail-item-slide2.jpg";
import slide3 from "../../images/detail-item-slide3.jpg";
import CardItemCarousel from "./CardItemCarousel";

const CardItemDetails = (props) => {
  const item = {
    title: "Cappadacia",
    ratingsCount: 258,
    learnersCount: 1983,
    price: 2400,
    estimateDeliveryTime: "5-7",
    availableSizes: ["XXS", "S", "M", "L", "XL", "XXL"],
    description:
      "Cappadocia hot air balloon can be pricey but it all comes down to what you may want to be included in the price. The price to ride a hot air balloon is in the range between $140 and $250 (€125 – €220) per person.\nThe cost depends on the duration of the flight, the moment of the day and whether is peak season or not",
    reviewsCount: 653,
    starsCount: 4,
    images: [slide1, slide2, slide3],
  };

  return (
    <>
      <CardItemCarousel images={item.images} />
    </>
  );
};

export default CardItemDetails;
