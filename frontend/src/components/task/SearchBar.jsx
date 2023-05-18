import classes from './TaskList.module.scss';

function SearchBar({ keyword, onChange }) {
    return (
        <input
            className={classes.searchbar}
            key="search-bar"
            value={keyword}
            placeholder="search tasks"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default SearchBar;
