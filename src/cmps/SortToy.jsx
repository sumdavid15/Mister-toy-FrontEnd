export function SortToy({ onChange }) {
    return (
        <section className="toy-sort">
            <div className="flex justify-between" style={{ gap: 10, width: '100%' }}>
                <label style={{ whiteSpace: 'nowrap' }} htmlFor="sortBy">Sort by</label>
                <select style={{ width: '100%' }} id="sortBy" name="sortBy" onChange={onChange}>
                    <option value="">select</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="created">Created</option>
                </select>
            </div>
        </section>
    );
}
