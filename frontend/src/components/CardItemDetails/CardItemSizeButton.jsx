const CardItemSizeButton = ({
  size,
  chooseCurrentSizeHandler,
  currentSize,
  sizeId
}) => {
  return (
    <>
      <button
        onClick={() => chooseCurrentSizeHandler(size, sizeId)}
        className={`card-item-details-size-button ${
          currentSize === size ? "active-item-details-size-button" : ""
        }`}
      >
        {size}
      </button>
    </>
  );
};

export default CardItemSizeButton;
