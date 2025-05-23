//These is the api route that sends the events data
//localhost:300/api/events 

import data from "../../data/data.json"; // importing the data from the data folder


import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(data);  //sending the data to the frontend
}