"use client";
import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const RouletteComponent = () => {
  const [input, setInput] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [mustSpin, setMustSpin] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState(0);
  const [order, setOrder] = useState<string[]>([]);

  const handleAdd = () => {
    const name = input.trim();
    if (!name || participants.includes(name) || order.includes(name)) return;
    setParticipants([...participants, name]);
    setInput("");
  };

  const handleSpin = () => {
    if (participants.length === 0) return;
    const index = Math.floor(Math.random() * participants.length);
    setWinnerIndex(index);
    setMustSpin(true);
  };

  const handleStop = () => {
    const winner = participants[winnerIndex];

    const next = participants.filter((_, i) => i !== winnerIndex);

    setOrder((prev) => [
      ...prev,
      winner,
      ...(next.length === 1 ? [next[0]] : []),
    ]);

    setParticipants(next.length === 1 ? [] : next);

    setMustSpin(false);
  };

  const data = participants.map((p) => ({ option: p }));

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4">
      {/* <Image src="/logo.png" alt="Logo" width={150} height={100} /> */}
      <h1 className="text-2xl font-bold mb-6 text-center">
        🎡 Ruleta de Exposición
      </h1>

      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Agregar nombre"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded">
          Agregar
        </button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 my-6 items-start justify-center">
        <div className="flex justify-center my-6">
          <Wheel
            mustStartSpinning={mustSpin}
            prizeNumber={winnerIndex}
            data={
              participants.length > 1
                ? data
                : [
                    {
                      option: "",
                    },
                  ]
            }
            onStopSpinning={handleStop}
            backgroundColors={[
              "#1e293b",
              "#4c1d95",
              "#065f46",
              "#0f172a",
              "#7f1d1d",
              "#3b0764",
              "#1e3a8a",
              "#164e63",
            ]}
            outerBorderColor="#1e293b"
            outerBorderWidth={4}
            textDistance={60}
            fontSize={16}
            textColors={["#fff"]}
          />
        </div>
        <div className="grid w-full">
          <div className="text-center mb-6 flex gap-6">
            <button
              onClick={handleSpin}
              disabled={participants.length <= 1 || mustSpin}
              className="bg-green-600 text-white px-6 py-2 rounded disabled:opacity-50 w-1/2">
              Girar ruleta
            </button>
            <button
              onClick={() => {
                setParticipants([]);
                setOrder([]);
                setInput("");
                setMustSpin(false);
              }}
              className="bg-red-600 text-white px-6 py-2 rounded w-1/2">
              Borrar todo
            </button>
          </div>

          <div className="flex gap-6">
            <div className="mb-4 w-1/2">
              <h2 className="font-semibold mb-1 text-xl">
                📝 Grupos restantes:
              </h2>
              <ul className="space-y-1 text-gray-700 mt-5">
                {participants.length ? (
                  participants.map((p, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-between bg-slate-100 px-3 py-1 rounded">
                      <span>{p}</span>
                      <button
                        onClick={() =>
                          setParticipants((prev) =>
                            prev.filter((_, idx) => idx !== i),
                          )
                        }
                        className="text-red-500 hover:text-red-700 text-sm font-bold"
                        aria-label={`Eliminar ${p}`}>
                        ❌
                      </button>
                    </li>
                  ))
                ) : (
                  <p className="text-sm italic text-gray-400">Ninguno</p>
                )}
              </ul>
            </div>

            <div className="w-1/2">
              <h2 className="font-semibold mb-1 text-xl">
                📋 Orden de exposición:
              </h2>
              <ol className="list-decimal list-inside text-gray-800 font-medium mt-5">
                {order.map((name, index) => (
                  <li key={index} className="">
                    {name}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteComponent;

