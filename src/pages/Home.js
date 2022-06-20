import {
  Autocomplete,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import PageWrapper from "../components/PageWrapper"
import GoogleLogoutBtn from "../components/GoogleLogoutBtn"
import { useSelector } from "react-redux"
import { Fragment, useEffect, useState } from "react"
import useAxios from "../hooks/useAxios"
import { DEBOUNCE_DELAY, SEARCH_API } from "../constants"

const Home = () => {
  const { user } = useSelector((state) => state.auth)
  const { sendRequest: searchRequest, isLoading: searchIsLoading } = useAxios()
  const [results, setResults] = useState([])
  const [open_dropdown, set_open_dropdown] = useState(false)
  const [open_dialog, set_open_dialog] = useState(false)
  const [selection, set_selection] = useState()

  const search_results_handler = (results_array) => {
    setResults([...results_array])
    set_open_dropdown(true)
  }

  let searchTimeout

  const searchHandler = (searchValue) => {
    if (!searchValue) {
      return
    }

    clearTimeout(searchTimeout)
    // set_open_dropdown(false)

    searchTimeout = setTimeout(() => {
      searchRequest(
        {
          method: SEARCH_API.method,
          api: SEARCH_API.api,
          params: {
            name: searchValue,
          },
          noAuth: true,
        },
        search_results_handler
      )
    }, DEBOUNCE_DELAY)
  }

  const selectHandler = (selection) => {
    if (!selection) {
      return
    }

    console.log("selection", selection)
    set_selection(selection)
    toggle_dialog_handler()
  }
  const toggle_dialog_handler = () => {
    set_open_dialog((prevState) => !prevState)
  }

  return (
    <PageWrapper title={`Welcome, ${user?.name}`}>
      <Stack spacing={3}>
        <Stack>
          <Autocomplete
            open={open_dropdown}
            onOpen={() => set_open_dropdown(true)}
            onClose={() => set_open_dropdown(false)}
            getOptionLabel={(result) => result?.name}
            options={results}
            loading={searchIsLoading}
            loadingText="Searching..."
            // isOptionEqualToValue={(option, value) => option.name === value.name}
            onChange={(e, new_value) => selectHandler(new_value)}
            // onInputChange={(e, new_input_value) =>
            //   searchHandler(new_input_value)
            // }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                // value={user_input}
                onChange={(e) => searchHandler(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <Fragment>
                      {searchIsLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </Fragment>
                  ),
                }}
              />
            )}
          />
        </Stack>
        <GoogleLogoutBtn />
        <Dialog onClose={toggle_dialog_handler} open={open_dialog}>
          <DialogTitle>{selection?.name}</DialogTitle>
          <DialogContent>
            <Typography>
              Country: {selection?.country} ({selection?.alpha_two_code})
            </Typography>
            <List>
              Web pages:{" "}
              {selection?.web_pages?.length
                ? selection?.web_pages.map((d) => (
                    <ListItem key={d}>{d}</ListItem>
                  ))
                : "N/A"}
            </List>
          </DialogContent>
          <DialogActions>
            <Button onClick={toggle_dialog_handler} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </PageWrapper>
  )
}

export default Home
