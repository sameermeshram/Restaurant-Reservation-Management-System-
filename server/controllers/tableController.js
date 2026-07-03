import asyncHandler from '../middleware/asyncHandler.js';
import * as tableService from '../services/tableService.js';

export const createTable = asyncHandler(async (req, res) => {
  const table = await tableService.createTable(req.body);

  res.status(201).json({
    success: true,
    message: 'Table created successfully',
    data: table,
  });
});

export const getTables = asyncHandler(async (req, res) => {
  const tables = await tableService.getTables();

  res.status(200).json({
    success: true,
    results: tables.length,
    data: tables,
  });
});

export const updateTable = asyncHandler(async (req, res) => {
  const table = await tableService.updateTableById(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Table updated successfully',
    data: table,
  });
});

export const deleteTable = asyncHandler(async (req, res) => {
  await tableService.deleteTableById(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Table deleted successfully',
  });
});
