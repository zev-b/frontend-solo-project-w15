import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSpotThunk } from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import './CreateSpotPage.css'

function CreateSpotPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userId = useSelector(state => state.session.user?.id)

    const [country, setCountry] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImageUrl, setPreviewImageUrl] = useState("");
    const [imageUrls, setImageUrls] = useState(["", "", "", ""]);
    const [errors, setErrors] = useState({ imageUrls: [] });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validations = { imageUrls: [] };

        if (!country) validations.country = "Country is required";
        if (!streetAddress) validations.streetAddress = "Street address is required";
        if (!city) validations.city = "City is required";
        if (!state) validations.state = "State is required";
        if (!latitude) validations.latitude = "Latitude is required";
        if (Number.isNaN(parseFloat(latitude)) || latitude > 90 || latitude < -90) validations.latitude = 'Latitude must be within -90 and 90';
        if (!longitude) validations.longitude = "Longitude is required";
        if (Number.isNaN(parseFloat(longitude)) || longitude > 180 || longitude < -180) validations.longitude = 'Longitude must be within -180 and 180';
        if (description.length < 30) validations.description = "Description needs a minimum of 30 characters";
        if (!name) validations.name = "Name is required";
        if (!price) validations.price = "Price is required";
        if (price < 1) validations.price = 'Price per day must be a positive number';
        if (!previewImageUrl) validations.previewImageUrl = "Preview image is required";
        // if (!) errors. = ;

        const validUrl = /\.(?:png|jpg|jpeg)$/i;
        if (!validUrl.test(previewImageUrl)) {
            validations.previewImageUrl = "Preview Image URL needs to end in .png, .jpg, or .jpeg";
        }

        imageUrls.forEach((url, index) => {
            if (url && !validUrl.test(url)) {
                validations.imageUrls[index] = `Image URL needs to end in .png, .jpg, or .jpeg`;
            }
        });

        setErrors(validations);

        const newSpot = {
            ownerId: userId,
            country,
            streetAddress,
            city,
            state,
            description,
            name,
            price,
            previewImageUrl,
            imageUrls,
        };

        const createdSpot = await dispatch(createSpotThunk(newSpot)); 

        if (createdSpot.errors) {
            return;
        }
        
        // navigate(`/spots/${createdSpot.id}`);
    };


    return (
        <form className="create-spot-form" onSubmit={handleSubmit}>
            <h1>Create a New Spot</h1>

             {/* Location Section */}
             <section>
                <h3>Where&apos;s your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation.</p>
                <label>
                  Country
                <input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                />
                </label>
                {errors.country && <p className="error">{errors.country}</p>}
                <label>
                  Street Address
                <input
                    type="text"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    required
                />
                </label>
                {errors.streetAddress && <p className="error">{errors.streetAddress}</p>}
                <label>
                    City
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    />
                    </label>   
                {errors.city && <p className="error">{errors.city}</p>}
                <label>
                State
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    />
                    </label>
                {errors.state && <p className="error">{errors.state}</p>}
                <label>
                    Latitude
                <input
                    type="text"
                    placeholder="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                    />
                    </label>
                    {errors.latitude && <p className="error">{errors.latitude}</p>}
                <label>
                  Longitude
                <input
                    type="text"
                    placeholder="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)} 
                    required
                    />
                    </label>
                    {errors.longitude && <p className="error">{errors.longitude}</p>}
            </section>

            <hr />

            {/* Description Section */}
            <section>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                <textarea
                    placeholder="Please write at least 30 characters"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                {errors.description && <p className="error">{errors.description}</p>}
            </section>

            <hr />
            
            {/* Title Section */}
            <section>
                <h3>Create a title for your spot</h3>
                <p>Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <input
                    type="text"
                    placeholder="Name of your spot"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                {errors.name && <p className="error">{errors.name}</p>}
            </section>

            <hr />
            
            {/* Price Section */}
            <section>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                $<input
                    type="number"
                    placeholder="Price per night (USD)"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                {errors.price && <p className="error">{errors.price}</p>}
            </section>

            <hr />

            {/* Image URL Section */}
            <section>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <input
                    type="text"
                    placeholder="Preview Image URL"
                    value={previewImageUrl}
                    onChange={(e) => setPreviewImageUrl(e.target.value)}
                    required
                />
                {errors.previewImageUrl && <p className="error">{errors.previewImageUrl}</p>}
                
                {imageUrls.map((url, idx) => (
                    <div key={idx}>
                        <input
                            type="text"
                            placeholder={`Image URL`}
                            value={url}
                            onChange={(e) => {
                                const newImageUrls = [...imageUrls];
                                newImageUrls[idx] = e.target.value;
                                setImageUrls(newImageUrls);
                            }}
                        />
                        {errors.imageUrls[idx] && <p className="error">{errors.imageUrls[idx]}</p>}
                    </div>
                ))}
            </section>

            <hr />

            {/* Submit Button */}
            <button type="submit">Create Spot</button>
        </form>
    )
}

export default CreateSpotPage;