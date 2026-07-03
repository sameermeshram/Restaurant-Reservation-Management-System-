import Table from '../models/Table.js';
import AppError from '../utils/AppError.js';

export const createTable = async (payload) => {
  const tableNumber = String(payload.tableNumber || '').trim();

  const existingTable = await Table.findOne({ tableNumber });
  if (existingTable) {
    throw new AppError('Table number already exists', 409);
  }

  const table = await Table.create({
    tableNumber,
    capacity: payload.capacity,
    isActive: payload.isActive,
  });

  return table;
};

export const getTables = async () => {
  const tables = await Table.find().sort({ tableNumber: 1 });
  return tables;
};

export const updateTableById = async (tableId, payload) => {
  const existingTable = await Table.findById(tableId);
  if (!existingTable) {
    throw new AppError('Table not found', 404);
  }

  if (payload.tableNumber) {
    const normalizedTableNumber = String(payload.tableNumber).trim();
    const duplicateTable = await Table.findOne({ tableNumber: normalizedTableNumber });

    if (duplicateTable && duplicateTable._id.toString() !== tableId) {
      throw new AppError('Table number already exists', 409);
    }

    existingTable.tableNumber = normalizedTableNumber;
  }

  if (typeof payload.capacity !== 'undefined') {
    existingTable.capacity = payload.capacity;
  }

  if (typeof payload.isActive !== 'undefined') {
    existingTable.isActive = payload.isActive;
  }

  await existingTable.save();
  return existingTable;
};

export const deleteTableById = async (tableId) => {
  const table = await Table.findById(tableId);
  if (!table) {
    throw new AppError('Table not found', 404);
  }

  await table.deleteOne();
};
