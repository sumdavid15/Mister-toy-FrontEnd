export function SortToy({ onChange }) {
    return (
        <section className="toy-sort">
            <div>
                <label htmlFor="sortBy">Sort by:</label>
                <select id="sortBy" name="sortBy" onChange={onChange}>
                    <option value="">select</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="created">Created</option>
                </select>
            </div>
        </section>
    );
}
