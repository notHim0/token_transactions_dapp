import Select from "react-select";

export function OptionList({ tokenList, onTokenSelect }) {
  const options = tokenList.map((token) => ({
    value: token.address,
    decimals: token.decimals,
    label: (
      <div className="flex items-center">
        <img src={token.logoURI} alt={token.name} className="w-6 h-6 mr-2" />
        {token.name}
      </div>
    ),
  }));

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#2d2d2d", // Background color of the dropdown
      color: "white", // Text color
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#575757" : "#2d2d2d",
      color: state.isFocused ? "white" : "#d1d1d1",
      padding: 10,
      cursor: "pointer",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1e1e1e",
      borderColor: "#575757",
      color: "white",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Choose a token..."
      onChange={(e) => {
        onTokenSelect({
          tokenMint: e.value,
          tokenDecimal: e.decimals,
        });
      }}
    />
  );
}
