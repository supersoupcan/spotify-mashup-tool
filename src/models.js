export const modes = [
  [ { name : "A", 
      value : 1
    }, 
    { name : "B",
     value : 0
    }
  ],
  [ { name : "major",
      value : 0
    }, 
    { name : "minor",
      value : 1
    }]
];

export const settings = [
  {
    name : "Camelot",
    value : 0
  },
  {
    name : "Classic",
    value : 1
  }
];

export const keyFilters=[
  { name: "Match",
    default : false,
    value : 0,
    mode: {
      filter : true,
      select: [0]
    }
  }, 
  { name: "Relative",
    default : false,
    value : 1,
    mode: {
      filter : true,
      select: [0, 12]
    }
  },
  { name: "Harmonic",
    default : false,
    value : 2,
    mode: {
      filter: true,
      select: [-1, 0, 1, 12]
    }
  },
  { name : "Off",
    default : true,
    value : 3,
    mode: {
      filter : false
    }
  }
];

export const tempoFilters=[
  { name : "Match",
    value : 0,
    mode : {
      filter: true,
      select: 0.00
    }
  },
  { name: "±2.5%",
    value : 1,
    mode: {
      filter: true,
      select: 0.025
  }}, 
  { name: "±5%",
    value : 2,
    mode: {
      filter: true,
      select: 0.05
  }}, 
  { name: "±10%",
    value : 3,
    mode: {
      filter: true,
      select: 0.1
  }},
  { name: "±15%",
    value : 4,
    mode: {
      filter: true,
      select: 0.1
  }}, 
  { name: "Off",
    value : "5",
    mode: {
      filter: false,
  }}
];

export const scales = [
  [ { name : "1",
      value : 0
    },
    { 
      name : "2",
      value : 1
    }, 
    { name : "3",
      value : 2
    }, 
    { name : "4",
      value : 3
    }, 
    { name : "5",
      value : 4
    }, 
    { name : "6",
      value : 5
    }, 
    { name : "7",
      value : 6
    }, 
    { name : "8",
      value : 7
    }, 
    { name : "9",
      value : 8
    },
    { name : "10",
      value : 9
    }, 
    { name : "11",
      value : 10
    }, 
    { name : "12",
      value : 11
    }
  ],
  [ { name : "C",
      value : 7
    },
    { name : "D♭",
      value : 2
    },
    { name : "D",
      value : 9
    },
    { name : "E♭",
      value : 4
    },
    { name : "E",
      value : 11
    },
    { name : "F",
      value : 6,
    },
    { name : "F#",
      value : 1,
    },
    { name : "G",
      value : 8,
    },
    { name : "A♭",
      value : 3,
    },
    { name : "A",
      value : 10,
    }, 
    { name : "B♭",
      value : 5,
    },
    { name : "B",
      value : 0
    },
  ],
];



export const keys = [
    ["1B", "B major"],
    ["2B", "F# major"],
    ["3B", "D♭ major"],
    ["4B", "A♭ major"],
    ["5B", "E♭ major"],
    ["6B", "B♭ major"],
    ["7B", "F major"],
    ["8B", "C major"],
    ["9B", "G major"],
    ["10B", "D major"],
    ["11B", "A major"],
    ["12B", "E major"],
    ["1A", "A♭ minor"],
    ["2A", "E♭ minor"],
    ["3A", "B♭ minor"],
    ["4A", "F minor"],
    ["5A", "C minor"],
    ["6A", "G minor"],
    ["7A", "D minor"],
    ["8A", "A minor"],
    ["9A", "E minor"],
    ["10A", "B minor"],
    ["11A", "F# minor"],
    ["12A", "D♭ minor"]
];
