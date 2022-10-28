import { Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {  ReactElement, useEffect, useState } from "react";
import { StartupHttpService } from "../../Http/Startup/Startup.http.service";
import { StartupDTO } from "../../Types/Startup";

export default function StartupList(): ReactElement {
  const [data, setData] = useState<StartupDTO[]>([])
  const [error, setError] = useState<String>('')
  const [loading, setLoading] = useState<Boolean>(false)
  const [startIndexData, setStartIndexData] = useState<number>(0)


  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const result = await StartupHttpService.getStartups()
        if (result) {
          setData(result.slice(0, startIndexData + 20))
        }
      }
      catch (error) {
        setError(`there is an error ${error}`)
      }
      setLoading(false)
    }
    getData()
  }
, [startIndexData])
  console.log(startIndexData)
  return (
    <Box sx={{ backgroundColor: 'grey' }}>
      {loading && <Typography>Data is loading...</Typography>}
      {error && <Typography>{error}</Typography>}
      {data && data.map((startup: StartupDTO) => {
        const { id, name, dateFounded, employees, totalFunding, currentInvestmentStage, shortDescription } = startup

        return (
          <Card key={id} sx={{ margin: '2rem'}}>
            <CardContent>
              <Typography variant='h2'>
                {name}
              </Typography>
              <Typography variant='caption' color='#a5a5a5'>
                Founded: {dateFounded.slice(0,4)} || {employees} employees || {totalFunding} $ || {currentInvestmentStage}
              </Typography>
              <Typography variant='body1' mt={3}>
                {shortDescription}
              </Typography>
            </CardContent>
          </Card>
        )
      }
      )}
      <Button onClick={() => setStartIndexData((prev) => prev + 20)}>Load more data</Button>
    </Box>);
}
