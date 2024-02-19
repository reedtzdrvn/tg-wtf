export function ImagesSlider({ imageUrls }){
    const [imageIndex, setimageIndex] = useState(0)

    return <div>
        <img src={imageUrls[imageIndex]} alt="" />
        
    </div>
}