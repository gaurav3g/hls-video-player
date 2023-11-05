import React from 'react';
import ReactPlayer from 'react-player'
import { Alert, Box, CircularProgress, IconButton, Paper, Slider, TextField } from "@mui/material";
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { buffer_marks, init_state } from "./constants";
import { displayTime } from "./utils";

import './App.css'

function App() {
  const playerRef = React.useRef(null);
  const [{
    url,
    playing,
    isReady,
    duration,
    playedSeconds,
    errorMsg,
  }, _setState] = React.useState(init_state);
  const setState = (key, value) => {
    _setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const changeHandler = (e) => {
    const {target: {value = ''}} = e;
    setState('url', value);
    setState('isReady', false);
    setState('errorMsg', '');
  }

  const playPauseHandler = () => {
    setState('playing', !playing)
  }

  const sliderHandler = (e) => {
    const {target: {value = 0} = {}} = e;
    playerRef.current.seekTo(value / 100, 'fraction');
  }

  return (
    <>
      <TextField fullWidth onChange={changeHandler} gutterBottom value={url} label="Input URL" />
      <Box sx={{ paddingY: 2 }}>
        {!!url && !isReady && !errorMsg && <CircularProgress />}
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert> }
      </Box>
      <ReactPlayer
        ref={playerRef}
        playing={playing}
        url={url}
        onReady={() => setState('isReady', true)}
        onDuration={(s) => setState('duration', s)}
        onProgress={({playedSeconds}) => setState('playedSeconds', playedSeconds)}
        onError={() => setState('errorMsg', '404 (Not Found)')}
      />
      {isReady && !errorMsg && (
        <>
          <Box>
            <Slider
              aria-label="seek-bar"
              defaultValue={0}
              value={(playedSeconds/duration) * 100}
              onChange={sliderHandler}
              step={25}
              min={0}
              max={100}
              marks={buffer_marks.map((v, i) => ({...v, label: displayTime(duration * (i/5))}))}
            />
          </Box>
          <Box display='flex' justifyContent='space-between'>
            <Paper sx={{display: 'inline', padding: 2}}>
              Current Time: {displayTime(playedSeconds)}
            </Paper>
            <IconButton onClick={playPauseHandler}>
              {playing
                ? <PauseCircleOutlinedIcon fontSize="large" />
                : <PlayCircleFilledWhiteOutlinedIcon fontSize="large" />}
            </IconButton>
          </Box>
        </>
      )}
    </>
  )
}

export default App
