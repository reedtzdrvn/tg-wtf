const CardItemSizeButton = ({
  size,
  chooseCurrentSizeHandler,
  currentSize,
}) => {
  return (
    <>
      <button
        onClick={() => chooseCurrentSizeHandler(size)}
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
