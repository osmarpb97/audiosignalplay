import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Recorder } from 'module/index'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { diezmacion } from 'lib/array'
import TextField from '@material-ui/core/TextField';
import Navbar from 'components/navbar'
import audioBufferToWav from 'lib/audio_to_wav'

export default function Diezmacion() {

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

    const [signal, set_signal] = useState(null)
    const [audio_context, set_audio_context] = useState({})
    const [suma, set_suma] = useState(null)
    const [sumAudioURL, setsumAudioURL] = useState(null)
    const [input, set_input] = useState(1)

    useEffect(() => {
        window.AudioContext = window.AudioContext;
        const audioContext = new AudioContext();
        set_audio_context(audioContext)
    }, [])

    useEffect(() => {
        if (signal != null) { sumSignal(); }
    }, [signal,input])

    const visualizeAudio = (url, set, set_s) => {
        fetch(url)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => audio_context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => { set(audioBuffer); set_s(filterData(audioBuffer)); })
    };

    const sumSignal = () => {
        // Get the data of the audio file
        var raw_signal_1 = first_file.getChannelData(0);
        //Get the duration in seconds of the final file
        var total_time = first_file.duration;
        // Create new buffer to store the operation
        var sumBuffer = audio_context.createBuffer(1, audio_context.sampleRate * total_time, audio_context.sampleRate);
        var sum_chanel = sumBuffer.getChannelData(0);

        var rawSum = diezmacion(input, raw_signal_1)
        console.log(input)
        for (var i = 0; i < rawSum.length; i++) {
            sum_chanel[i] = rawSum[i]
        }
        set_suma(filterData(sumBuffer))
        setsumAudioURL(URL.createObjectURL(new Blob([audioBufferToWav(sumBuffer)], { type: "audio/wav" })))

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

    const handleChange = (newValue: number | number[]) => {
        console.log("Cambiando a ", newValue)
        set_input(newValue as number);
    };

    return (
        <div style={{ backgroundColor: "#212121" }} className="text-center flex items-center justify-center h-screen">
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className="w-full flex">
                <div className="w-6/12 mx-0 my-auto">
                    <h1 className="text-white text-2xl">Numero de veces a diezmar</h1>
                    <div className="flex p-20 text-white">
                        <h1 className="text-white text-2xl mr-4">N = </h1>
                        <TextField className="mx-4 text-white " defaultValue={1} type="number" color="secondary" onChange={e => handleChange(e.target.value)} aria-labelledby="continuous-slider" />
                    </div>
                </div>
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
                        <YAxis />
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
        </div >
    )
}
