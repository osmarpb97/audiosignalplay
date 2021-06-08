import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Recorder } from 'module/index'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { substr } from 'lib/array'
import Navbar from 'components/navbar'
import audioBufferToWav from 'lib/audio_to_wav'

export default function Resta() {

  const [first_file, set_first_file] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: null,
      m: null,
      s: null,
    }
  })

  const [second_file, set_second_file] = useState({
    url: null,
    blob: null,
    chunks: null,
    duration: {
      h: null,
      m: null,
      s: null,
    }
  })
  const [signal, set_signal] = useState(null)
  const [signal2, set_signal2] = useState(null)

  const [audio_context, set_audio_context] = useState({})
  const [suma, set_suma] = useState(null)
  const [sumAudioURL, setsumAudioURL] = useState(null)

  useEffect(() => {
    window.AudioContext = window.AudioContext;
    const audioContext = new AudioContext();
    set_audio_context(audioContext)
  }, [])

  useEffect(() => {
    if (signal != null && signal2 != null) { sumSignal(); }
  }, [signal, signal2])

  const visualizeAudio = (url, set, set_s) => {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audio_context.decodeAudioData(arrayBuffer))
      .then(audioBuffer => { set(audioBuffer); set_s(filterData(audioBuffer)); })
  };

  const sumSignal = () => {
    // Get the data of the audio file
    var raw_signal_1 = first_file.getChannelData(0);
    var raw_signal_2 = second_file.getChannelData(0);
    //Get the duration in seconds of the final file
    var total_time = Math.max(first_file.duration, second_file.duration);
    // Create new buffer to store the operation
    var sumBuffer = audio_context.createBuffer(1, audio_context.sampleRate * total_time, audio_context.sampleRate);
    var sum_chanel = sumBuffer.getChannelData(0);

    var rawSum = substr(audio_context.sampleRate * total_time, raw_signal_1, raw_signal_2)
    for (var i = 0; i < rawSum.length; i++) {
      sum_chanel[i] = rawSum[i]
    }

    setsumAudioURL(URL.createObjectURL(new Blob([audioBufferToWav(sumBuffer)], { type: "audio/wav" })))
    set_suma(filterData(sumBuffer))
  }

  const filterData = audioBuffer => {
    const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
    const samples = 1000; // Number of samples we want to have in our final data set
    const blockSize = Math.floor(rawData.length / samples); // Number of samples in each subdivision
    const filteredData = [];
    for (let i = 0; i < samples; i++) {
      const sample = { sample: rawData[i * blockSize] }
      filteredData.push(sample);
    }
    return filteredData;
  }

  const handleAudioStop = (data, set, set_s) => {
    set({ data });
    visualizeAudio(data.url, set, set_s);
    setsumAudioURL(null);
  }

  const handleRest = (set) => {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      duration: {
        h: null,
        m: null,
        s: null,
      }
    }
    set(reset);
  }

  return (
    <div style={{ backgroundColor: "#212121" }} className="text-center flex items-center justify-center h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div className="w-full flex">
        <div className=" w-6/12">
          <h1 className="text-white text-2xl">Señal A</h1>
          <LineChart
            style={{ margin: "0 auto" }}
            width={500}
            height={300}
            data={signal}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample" stroke="#f50057" dot={false} />
          </LineChart>
          <Recorder
            record={true}
            audioURL={first_file.url}
            showUIAudio
            hideHeader={true}
            handleAudioStop={data => handleAudioStop(data, set_first_file, set_signal)}
            handleOnChange={(value) => handleOnChange(value, 'firstname')}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleRest(set_first_file)}
          />

        </div>
        <h1 className="text-white text-2xl">-</h1>
        <div className="w-6/12">
          <h1 className="text-white text-2xl">Señal B</h1>
          <LineChart
            style={{ margin: "0 auto" }}
            width={500}
            height={300}
            data={signal2}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="sample" stroke="#f50057" dot={false} />
          </LineChart>
          <Recorder
            record={true}
            audioURL={second_file.url}
            showUIAudio
            hideHeader={true}
            handleAudioStop={data => handleAudioStop(data, set_second_file, set_signal2)}
            handleOnChange={(value) => handleOnChange(value, 'firstname')}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleRest(set_second_file)}
          />
        </div>
      </div>
      <h1 className="text-white text-2xl">=</h1>
      <div className="flex flex-col items-center">
        <LineChart
          width={500}
          height={300}
          data={suma}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Tooltip />
          <Legend />
          <YAxis />
          <Line type="monotone" dataKey="sample" stroke="#8884d8" dot={false} />
        </LineChart>

        <div className="mt-10">
          {sumAudioURL !== null ? (
            <audio controls autoPlay>
              <source src={sumAudioURL} type="audio/ogg" />
              <source src={sumAudioURL} type="audio/mpeg" />
            </audio>
          ) : null}
        </div>
      </div>
    </div>
  )
}
