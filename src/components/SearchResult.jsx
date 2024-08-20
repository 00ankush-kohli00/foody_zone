import styled from "styled-components";
import { BASE_URL, Button } from "../App";

// image: "/images/egg.png";
// name: "Boilded Egg";
// price: 10;
// text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.";
// type: "breakfast";

const SearchResult = ({ data }) => {
  return (
    <FoodCardContainer>
      <FoodCards>
        {data?.map(({ image, name, text, price }, index) => (
          <FoodCard key={index}>
            <div className="food_img">
              <img src={BASE_URL + image} alt={name} />
            </div>
            <div className="food_info">
              <div>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
              <Button>${price.toFixed(2)}</Button>
            </div>
          </FoodCard>
        ))}
      </FoodCards>
    </FoodCardContainer>
  );
};

export default SearchResult;

const FoodCardContainer = styled.section`
  background-image: url("./bg.png");
  background-size: cover;
  min-height: calc(100vh - 190px);
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FoodCards = styled.div`

  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 36px;
  column-gap: 40px;
`;
const FoodCard = styled.div`
  background: url(.png),
    radial-gradient(
      90.16% 143.01% at 15.32% 21.04%,
      rgba(165, 239, 255, 0.2) 0%,
      rgba(110, 191, 244, 0.1) 77.08%,
      rgba(70, 144, 213, 0) 100%
    );
  display: flex;
  width: 340px;
  height: 167px;
  background-blend-mode: overlay, normal;
  backdrop-filter: blur(13.184px);
  border-radius: 20px;
  padding: 10px;
  .food_info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    h3 {
      margin-top: 8px;
      font-size: 16px;
      font-weight: 500;
    }
    p {
      margin-top: 4px;
      font-size: 12px;
    }
    button {
      font-size: 12px;
    }
  }
`;
