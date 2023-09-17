import React from "react";
import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box w="full" bgColor="blackAlpha.900" h="85vh">
      <motion.div
        style={{
          h: "80vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w="full"
          h="full"
          objectFit={"contain"}
          src="https://bernardmarr.com/img/What%20is%20the%20Difference%20Between%20Blockchain%20And%20Bitcoin.png"
          alt="img"
        />
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color="whiteAlpha.700"
        mt="-20"
      >
        Crypto Creek
      </Text>
    </Box>
  );
};

export default Home;
