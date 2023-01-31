import * as midi from 'midi';
var k, key, keys, pitches, q, relatives, song, x;
console.log("Welcome to the Fibonacci Composer.");
x = Number.parseInt(input("Enter Song Length: "));
k = input("Enter Song Key (C, G, D, A, E, B, F#, Db, Ab, Eb, Bb, F): ");
q = input("Enter Key Quality (maj, min): ");
keys = {
  "C": ["C", "D", "E", "F", "G", "A", "B"],
  "G": ["G", "A", "B", "C", "D", "E", "F#"],
  "D": ["D", "E", "F#", "G", "A", "B", "C#"],
  "A": ["A", "B", "C#", "D", "E", "F#", "G#"],
  "E": ["E", "F#", "G#", "A", "B", "C#", "D#"],
  "B": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
  "F#": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
  "Db": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
  "Ab": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
  "Eb": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
  "Bb": ["Bb", "C", "D", "Eb", "F", "G", "A"],
  "F": ["F", "G", "A", "Bb", "C", "D", "E"]
};
relatives = {
  "A": "C",
  "E": "G",
  "B": "D",
  "F#": "A",
  "Db": "E",
  "Ab": "B",
  "Eb": "F#",
  "Bb": "Db",
  "F": "Ab",
  "C": "Eb",
  "G": "Bb",
  "D": "F"
};
pitches = {
  "C": midi.C_3,
  "G": midi.G_3,
  "D": midi.D_3,
  "A": midi.A_3,
  "E": midi.E_3,
  "B": midi.B_3,
  "F#": midi.Fs_3,
  "Gb": midi.Fs_3,
  "C#": midi.Cs_3,
  "Db": midi.Cs_3,
  "G#": midi.Gs_3,
  "Ab": midi.Gs_3,
  "D#": midi.Ds_3,
  "Eb": midi.Ds_3,
  "A#": midi.As_3,
  "Bb": midi.As_3,
  "E#": midi.F_3,
  "F": midi.F_3
};
key = q === "maj" ? keys[k] : keys[relatives[k]];
song = [];

function fib(n) {
  /* Function that generates notes based off the Fibonnachi Series */
  var a, b, fib, first, mod;
  a = 0;
  b = 1;
  console.log("Fibonacci in " + k.toString() + q.toString() + ": ");
  first = q === "maj" ? 0 : 5;
  song.append(key[first]);

  for (var i = 1, _pj_a = n; i < _pj_a; i += 1) {
    fib = a + b;
    mod = fib % 7 - 1 >= 0 ? fib % 7 - 1 : 6;
    mod = q === "maj" ? mod : (mod + 5) % 7;
    song.append(key[mod]);
    a = b;
    b = fib;
  }

  for (var i, _pj_c = 0, _pj_a = song, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];
    console.log(i + ", ");
  }

  console.log("\n");
  to_midi(song, "fibonacci-" + k.toString() + q.toString() + ".mid");
}

function to_midi(song, filename) {
  var eot, off, on, pattern, track;
  pattern = new midi.Pattern();
  track = new midi.Track();
  pattern.append(track);

  for (var i, _pj_c = 0, _pj_a = song, _pj_b = _pj_a.length; _pj_c < _pj_b; _pj_c += 1) {
    i = _pj_a[_pj_c];
    on = new midi.NoteOnEvent({
      "tick": 0,
      "velocity": 60,
      "pitch": pitches[i]
    });
    track.append(on);
    off = new midi.NoteOffEvent({
      "tick": 100,
      "pitch": pitches[i]
    });
    track.append(off);
  }

  eot = new midi.EndOfTrackEvent({
    "tick": 1
  });
  track.append(eot);
  midi.write_midifile(filename, pattern);
}

while (x !== "") {
  fib(x);
  console.log();
  quit();
}
