import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { transactionApi } from '../services/transactionApi';
import './Dashboard.css';

/**
 * Dashboard Component
 * Main dashboard with tabs for different transaction views
 */
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const tabs = [
    { id: 'all', label: 'All Transactions', icon: '📋' },
    { id: 'success', label: 'Success', icon: '✓' },
    { id: 'failed', label: 'Failed', icon: '✗' },
    { id: 'pending', label: 'Pending', icon: '⏳' },
    { id: 'fraud', label: 'Fraud Alerts', icon: '🚨' },
  ];

  const fetchTransactions = async (tab) => {
    setLoading(true);
    setError(null);

    try {
      let result;
      switch (tab) {
        case 'success':
          result = await transactionApi.getSuccessTransactions();
          break;
        case 'failed':
          result = await transactionApi.getFailedTransactions();
          break;
        case 'pending':
          result = await transactionApi.getPendingTransactions();
          break;
        case 'fraud':
          result = await transactionApi.getFraudTransactions();
          break;
        default:
          result = await transactionApi.getAllTransactions();
      }

      if (result.success) {
        setTransactions(Array.isArray(result.data) ? result.data : []);
      } else {
        setError(result.error || 'Failed to fetch transactions');
        setTransactions([]);
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(activeTab);
  }, [activeTab, refreshKey]);

  const handleTransactionSubmitted = () => {
    // Refresh transactions after new submission
    setRefreshKey((prev) => prev + 1);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Calculate statistics
  const stats = {
    total: transactions.length,
    success: transactions.filter((t) => t.status === 'SUCCESS').length,
    failed: transactions.filter((t) => t.status === 'FAILED').length,
    pending: transactions.filter((t) => t.status === 'PENDING').length,
    fraud: transactions.filter((t) => t.fraudFlag === true || t.fraudFlag === 1).length,
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            <span className="title-icon">🔒</span>
            Transaction Fraud Detection System
          </h1>
          <p className="dashboard-subtitle">Monitor and manage financial transactions</p>
        </div>
        <button className="refresh-btn" onClick={handleRefresh} title="Refresh data">
          🔄 Refresh
        </button>
      </header>

      <div className="dashboard-content">
        {/* Statistics Cards */}
        <div className="stats-container">
          <div className="stat-card stat-total">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total Transactions</div>
            </div>
          </div>
          <div className="stat-card stat-success">
            <div className="stat-icon">✓</div>
            <div className="stat-info">
              <div className="stat-value">{stats.success}</div>
              <div className="stat-label">Successful</div>
            </div>
          </div>
          <div className="stat-card stat-failed">
            <div className="stat-icon">✗</div>
            <div className="stat-info">
              <div className="stat-value">{stats.failed}</div>
              <div className="stat-label">Failed</div>
            </div>
          </div>
          <div className="stat-card stat-pending">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <div className="stat-value">{stats.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>
          <div className="stat-card stat-fraud">
            <div className="stat-icon">🚨</div>
            <div className="stat-info">
              <div className="stat-value">{stats.fraud}</div>
              <div className="stat-label">Fraud Alerts</div>
            </div>
          </div>
        </div>

        {/* Transaction Form Section */}
        <section className="dashboard-section">
          <TransactionForm onTransactionSubmitted={handleTransactionSubmitted} />
        </section>

        {/* Transactions Table Section */}
        <section className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Transaction History</h2>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Transaction Table */}
          <TransactionTable
            transactions={transactions}
            loading={loading}
            error={error}
          />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

