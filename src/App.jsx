import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [selectBtn, setSelectBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setData(json);
        setFilteredData(json); // Initialize filteredData with the fetched data
      } catch (error) {
        setError("Unable to fetch data");
      } finally {
        setLoading(false);
      }
    };
    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (searchValue === "") {
      setFilteredData(data); // Reset to original data if search is cleared
    } else {
      const filtered = data.filter((food) =>
        food.name.toLowerCase().includes(searchValue)
      );
      setFilteredData(filtered);
    }
  };

  const filterFoodBtn = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectBtn("all");
      return;
    }
    const filtered = data.filter((food) =>
      food.type.toLowerCase().includes(type)
    );
    setFilteredData(filtered);
    setSelectBtn(type);
  };

  const btn = [
    {
      name: "All",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <TopContainer>
        <div className="logo">
          <img src="/logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input type="text" placeholder="Search Food" onChange={searchFood} />
        </div>
      </TopContainer>
      <FilterContainer>
        {btn.map((item, index) => (
          <Button key={index} onClick={() => filterFoodBtn(item.type)}>
            {item.name}
          </Button>
        ))}
      </FilterContainer>
      <SearchResult data={filteredData} />
    </Container>
  );
};

export default App;

const Container = styled.div`
  max-width: 100vw;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 32px;
  align-items: center;

  .search {
    input {
      background: transparent;
      border: 1px solid red;
      color: white;
      border-radius: 5px;
      font-size: 16px;
      padding: 0 10px;
      height: 40px;
    }
  }
  @media (width <= 1250px) {
    flex-direction: column;
    gap: 1.5rem;
    .search {
      width: 90%;
      input {
        width: 100%;
      }
    }
  }
`;
const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;
export const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px;
  padding: 6px 12px;
  border: 0;
  color: white;
`;
