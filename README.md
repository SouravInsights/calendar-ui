# Calendar-UI
A reusable calendar component built using Storybook. 

## Built using:
- [TailwindCSS](https://tailwindcss.com/)
- [React.js](https://reactjs.org/)
- [Storybook](https://storybook.js.org/)
- [date-fns](https://date-fns.org/)

## How to Setup:
- `git clone https://github.com/SouravInsights/calendar-ui.git`
- `cd calendar-ui`
- `yarn install`
- `yarn start`
- `yarn build`
- `yarn storybook`

## Understanding the date-fns functions used:
- [**format**](https://date-fns.org/v2.16.1/docs/format): Returns the formatted date string in the given format.
- [**startOfMonth**](https://date-fns.org/v2.16.1/docs/startOfMonth): Return the start of a month for the given date. The result will be in the local time zone.
- [**subMonths**](https://date-fns.org/v2.16.1/docs/subMonths): Subtract the specified number of months from the given date.
- [**addMonths**](https://date-fns.org/v2.16.1/docs/addMonths): Add the specified number of months to the given date.
- [**subYears**](https://date-fns.org/v2.16.1/docs/subYears): Subtract the specified number of years from the given date.
- [**addYears**](https://date-fns.org/v2.16.1/docs/addYears): Add the specified number of years to the given date.
- **[getDaysInMonth](https://date-fns.org/v2.16.1/docs/getDaysInMonth)**: Get the number of days in a month of the given date.
- [**getDay](https://date-fns.org/v2.16.1/docs/getDay):** Get the day of the week of the given date.
- **[endOfMonth](https://date-fns.org/v2.16.1/docs/endOfMonth)**: Return the end of a month for the given date. The result will be in the local timezone.
- **[setDate](https://date-fns.org/v2.16.1/docs/setDate)**: Set the day of the month to the given date.
- **[getDate](https://date-fns.org/v2.16.1/docs/getDate)**: Get the day of the month of the given date.
- **[isEqual](https://date-fns.org/v2.16.1/docs/isEqual):** Are the given dates equal?
- [**subWeeks**](https://date-fns.org/v2.16.1/docs/subWeeks): Subtract the specified number of weeks from the given date.
- **[addWeeks](https://date-fns.org/v2.16.1/docs/addWeeks)**: Add the specified number of week to the given date.
- **[subDays](https://date-fns.org/v2.16.1/docs/subDays)**: Subtract the specified number of days from the given date.
- **[addDays](https://date-fns.org/v2.16.1/docs/addDays)**: Add the specified number of days to the given date.

## Component design decisions:
- It's a composition of 2 components i.e, Calendar and CalendarControls. I followed this approach because I think there's a similar pattern in the [Google Calender](https://calendar.google.com/) UI.
- CalendarControls can have 3 variants of various header sizes and with different positions (center, left, right, etc.) See an example in this [Figma file](https://www.figma.com/file/QbMQxGK904AVFulLFqhvbm/CalendarUI?node-id=0%3A1).
- Calendar should be accessible by keyboard events so it's important to have hotkeys for easy navigation. I've added few basic hotkeys.
- I noticed that most of the calendars in other design systems doesn't have the button to control year navigations. I'm not sure how useful this might be but I thought it makes sense to have year controls on the calendar component.
- It's important to have comment lines for adoptability so that other developers can easily understand and customize the component if they want to.

## Demo
- [Live app demo](http://calendar-ui.vercel.app/) deployed using [Vercel](https://vercel.com/)
- [Storybook app demo](https://5fc4f579119b1f00210ebbf2-haemxtnvnv.chromatic.com/) deployed using [Chromatic](https://www.chromatic.com/)

## Improvements required:
- Adding more variants and stories for the Calendar and CalendarControls component
- Adding more props and functions to enable customization for various things like custom date format, multiple date selection, disable dates or month controls etc.
- Adding more hotkeys for the Calendar component to improve accessibility
