import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SelectKey, LayoutHero, LayoutDashboard } from '@chia/core';
import {
  WalletAdd,
  WalletImport,
  Wallets,
  WalletStatusHeader,
} from '@chia/wallets';
import AppProviders from './AppProviders';
import Settings from '../settings/Settings';
import DashboardSideBar from '../dashboard/DashboardSideBar';
import SettingsPanel from '../settings/SettingsPanel';

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<AppProviders outlet />}>
          <Route element={<LayoutHero settings={<SettingsPanel />} outlet />}>
            <Route index element={<SelectKey />} />
          </Route>
          <Route
            element={<LayoutHero settings={<SettingsPanel />} back outlet />}
          >
            <Route path="wallet/add" element={<WalletAdd />} />
            <Route path="wallet/import" element={<WalletImport />} />
          </Route>

          <Route
            element={
              <LayoutDashboard
                settings={<SettingsPanel />}
                sidebar={<DashboardSideBar simple />}
                actions={<WalletStatusHeader />}
                outlet
              />
            }
          >
            <Route path="dashboard" element={<Navigate to="wallets" />} />
            <Route path="dashboard/wallets/*" element={<Wallets />} />
            {/* <Route path="dashboard/offers/*" element={<CreateOffer />} />
            <Route path="dashboard/nfts/*" element={<NFTs />} /> */}
            <Route path="dashboard/*" element={<Navigate to="wallets" />} />
            <Route path="dashboard/settings/*" element={<Settings />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}
