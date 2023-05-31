import * as React from "react";
import Box from "@mui/material/Box";
import SyncIcon from "@mui/icons-material/Sync";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs'

const SUBMIT_FILTER_STROKE_TIME = 500;
function InputNumberInterval(props) {
	const { item, applyValue, focusElementRef = null } = props;

	const filterTimeout = React.useRef();
	const [filterValueState, setFilterValueState] = React.useState(
		item.value ?? ""
	);

	const [applying, setIsApplying] = React.useState(false);

	React.useEffect(() => {
		return () => {
			clearTimeout(filterTimeout.current);
		};
	}, []);

	React.useEffect(() => {
		const itemValue = item.value ?? [undefined, undefined];
		setFilterValueState(itemValue);
	}, [item.value]);

	const updateFilterValue = (lowerBound, upperBound) => {
		clearTimeout(filterTimeout.current);
		setFilterValueState([lowerBound, upperBound]);

		setIsApplying(true);
		filterTimeout.current = setTimeout(() => {
			setIsApplying(false);
			applyValue({ ...item, value: [lowerBound, upperBound] });
		}, SUBMIT_FILTER_STROKE_TIME);
	};

	const handleUpperFilterChange = (event) => {
		const newUpperBound = event.$d;
		updateFilterValue(filterValueState[0], newUpperBound);
	};
	const handleLowerFilterChange = (event) => {
		const newLowerBound = event.$d;
		updateFilterValue(newLowerBound, filterValueState[1]);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				sx={{
					display: "inline-flex",
					flexDirection: "row",
					alignItems: "end",
					height: "fit-content",
					pl: "25px",
					width: "fit-content"
				}}
			>
				<DatePicker
					name="lower-bound-input"
					placeholder="From"
					label="From"
					variant="standard"
					value={dayjs(new Date(filterValueState[0]))}
					onChange={handleLowerFilterChange}
					type="number"
					inputRef={focusElementRef}
					sx={{ mr: 2, minWidth: 200 }}
				/>
				<DatePicker
					name="upper-bound-input"
					placeholder="To"
					label="To"
					variant="standard"
					value={dayjs(new Date(filterValueState[1]))}
					onChange={handleUpperFilterChange}
					type="number"
					sx={{ mr: 2, minWidth: 200 }}
					InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
				/>
			</Box>
		</LocalizationProvider>
	);
}
const quantityOnlyOperators = [
	{
		label: "Between",
		value: "between",
		getApplyFilterFn: (filterItem) => {
			if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
				return null;
			}
			if (filterItem.value[0] == null || filterItem.value[1] == null) {
				return null;
			}

			return ({ value }) => {
				return (
					dayjs(value) !== null &&
					filterItem.value[0] <= dayjs(value) &&
					dayjs(value) <= filterItem.value[1]
				);
			};
		},
		InputComponent: InputNumberInterval,
	},
];

export default quantityOnlyOperators