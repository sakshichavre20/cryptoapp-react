import CoinCard from "./CoinCard";
import ErrorComponent from "./ErrorComponent";
import Loader from "./Loader";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../index";

import {
  Container,
  HStack,
  Button,
  Text,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

const Coins = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        // console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchCoins();
  }, [currency, page]);

  if (error) return <ErrorComponent msg="Error While Fetching Coins" />;

  const changePage = (p) => {
    if (p <= 131) {
      setPage(p + 1);
      setLoading(true);
    } else {
      setPage(1);
      setLoading(true);
    }
  };
  //   const btns = new Array(132).fill(1);

  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p="8">
            <HStack spacing={"4"}>
              <Radio value="inr">₹ INR</Radio>
              <Radio value="eur">€ EUR</Radio>
              <Radio value="usd">$ USD</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap="wrap" justifyContent={"space-evenly"}>
            {coin?.map((i, index) => (
              <CoinCard
                key={i?.id}
                id={i?.id}
                name={i?.name}
                img={i?.image}
                price={i?.current_price}
                symbol={i?.symbol}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>

          <HStack w="full" p="8" alignItems="center" justifyContent="center">
            {/* {btns?.map((item, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.900"}
                color="white"
                onClick={() => changePage(index)}
              >
                {page <= 131 ? `Next` : `End`}
              </Button>
            ))} */}
            <Text> Page {page}</Text>
            <Button
              variant="ghost"
              bgColor={"blackAlpha.400"}
              color="white"
              onClick={() => changePage(page + 1)}
            >
              {page < 132 ? `Next` : `End`}
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;
