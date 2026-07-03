import { useEffect, useState } from "react";
import AdminSidebar from "../../components/layout/AdminSidebar";
import {
  fetchTables,
  createTable,
  updateTable,
  deleteTable,
} from "../../services/tableService";
import { getErrorMessage } from "../../utils/errorMessage";

function TableManagement() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({
    tableNumber: "",
    capacity: 2,
    isActive: true,
  });
  const [editingTable, setEditingTable] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const loadTables = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchTables();
      setTables(response.data.data || []);
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to load tables. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);

  const resetForm = () => {
    setFormValues({ tableNumber: "", capacity: 2, isActive: true });
    setEditingTable(null);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      if (editingTable) {
        await updateTable(editingTable._id, formValues);
      } else {
        await createTable(formValues);
      }
      await loadTables();
      resetForm();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save table. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (table) => {
    setEditingTable(table);
    setFormValues({
      tableNumber: table.tableNumber,
      capacity: table.capacity,
      isActive: table.isActive,
    });
    setError("");
  };

  const handleDelete = async (tableId) => {
    setDeletingId(tableId);
    setError("");

    try {
      await deleteTable(tableId);
      await loadTables();
      if (editingTable?._id === tableId) {
        resetForm();
      }
    } catch (err) {
      setError(
        getErrorMessage(err, "Unable to delete table. Please try again."),
      );
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen flex">
      <AdminSidebar />
      <main className="flex-1 ml-72">
        <header className="sticky top-0 z-30 bg-surface-container-highest/80 backdrop-blur-xl border-b border-outline-variant px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-headline-lg font-headline-lg text-on-surface">
              Table Management
            </h1>
            <p className="text-body-sm text-on-surface-variant">
              Real-time floor plan overview and capacity control.
            </p>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-container transition-all shadow-sm"
          >
            <span className="material-symbols-outlined">add</span>
            Add New Table
          </button>
        </header>

        <div className="p-6 md:p-margin-desktop max-w-7xl mx-auto space-y-8">
          {error && (
            <div className="rounded-3xl border border-error bg-error/10 p-4 text-error text-body-sm">
              {error}
            </div>
          )}

          <section className="bg-surface border border-outline-variant rounded-3xl shadow-sm p-6">
            <h2 className="text-headline-sm font-headline-sm text-on-surface mb-4">
              {editingTable ? "Update Table" : "Create New Table"}
            </h2>
            <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant">
                  Table number
                </label>
                <input
                  type="text"
                  required
                  value={formValues.tableNumber}
                  onChange={(e) =>
                    setFormValues((current) => ({
                      ...current,
                      tableNumber: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-outline-variant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                  placeholder="T-12"
                />
              </div>
              <div>
                <label className="text-label-sm font-label-sm text-on-surface-variant">
                  Capacity
                </label>
                <input
                  type="number"
                  min="1"
                  required
                  value={formValues.capacity}
                  onChange={(e) =>
                    setFormValues((current) => ({
                      ...current,
                      capacity: Number(e.target.value),
                    }))
                  }
                  className="w-full rounded-2xl border border-outline-variant px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex flex-col justify-end gap-3">
                <label className="flex items-center gap-3 text-body-sm text-on-surface">
                  <input
                    type="checkbox"
                    checked={formValues.isActive}
                    onChange={(e) =>
                      setFormValues((current) => ({
                        ...current,
                        isActive: e.target.checked,
                      }))
                    }
                    className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
                  />
                  Active
                </label>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-2xl bg-primary text-white px-6 py-3 hover:bg-primary-container transition-all disabled:opacity-60"
                  >
                    {saving
                      ? "Saving..."
                      : editingTable
                        ? "Update Table"
                        : "Create Table"}
                  </button>
                  {editingTable && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-2xl bg-surface-container-high text-on-surface px-6 py-3 hover:bg-surface-container-low transition-all"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </section>

          <section className="bg-surface-container-lowest border border-outline-variant rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b border-outline-variant">
                  <tr>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Table
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Capacity
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant">
                      Status
                    </th>
                    <th className="p-5 text-label-sm font-label-sm text-on-surface-variant text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-10 text-center text-on-surface-variant"
                      >
                        Loading tables...
                      </td>
                    </tr>
                  ) : tables.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="p-10 text-center text-on-surface-variant"
                      >
                        No tables found. Create a new table to get started.
                      </td>
                    </tr>
                  ) : (
                    tables.map((table) => (
                      <tr
                        key={table._id}
                        className="hover:bg-surface-container-high/50 transition-colors"
                      >
                        <td className="p-5 font-medium text-on-surface">
                          {table.tableNumber}
                        </td>
                        <td className="p-5 text-on-surface-variant">
                          {table.capacity}
                        </td>
                        <td className="p-5">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-label-sm font-label-sm ${
                              table.isActive
                                ? "bg-secondary-container text-on-secondary-container"
                                : "bg-error-container text-on-error-container"
                            }`}
                          >
                            {table.isActive ? "Active" : "Inactive"}
                          </span>
                        </td>
                        <td className="p-5 text-right">
                          <div className="inline-flex items-center gap-2 justify-end">
                            <button
                              type="button"
                              onClick={() => startEdit(table)}
                              className="p-2 rounded-lg hover:bg-surface-container-high transition-colors text-on-surface-variant"
                            >
                              <span className="material-symbols-outlined">
                                edit
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(table._id)}
                              disabled={deletingId === table._id}
                              className="p-2 rounded-lg hover:bg-error/10 transition-colors text-error disabled:opacity-60"
                            >
                              <span className="material-symbols-outlined">
                                {deletingId === table._id
                                  ? "hourglass_top"
                                  : "delete"}
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default TableManagement;
