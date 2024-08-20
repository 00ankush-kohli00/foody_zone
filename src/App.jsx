import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);

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
        <Button>All</Button>
        <Button>Breakfast</Button>
        <Button>Lunch</Button>
        <Button>Dinner</Button>
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
