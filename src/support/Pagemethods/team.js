import { expect } from '@playwright/test';
import { clickWebElement, inputField, visibilityOfElement } from '../Utils/generalPlaywrightMethods';
import teamData from '../TestData/team.json' with { type: 'json' };

export class Team {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.getByRole('button', { name: 'Sign In', exact: true });
        this.teamTab = page.getByTestId('teamLink');
        this.fuseLogo = page.locator('svg path[fill="#FD395A"]');
        this.importerTab = page.getByTestId('importersLink');
        this.fileImportTab = page.getByTestId('importsLink');
        this.teamTab = page.getByTestId('teamLink');
        this.brandingTab = page.getByTestId('brandingLink');
        this.developersTab = page.getByTestId('developerLink');
        this.documentTab = page.locator('.ezpezU').last();
        this.menuIcon = page.locator('.eJpXAL');
        this.teamTitleText = page.getByTestId('teamTitle');
        this.teamTable = page.locator('.jHqjLm');
        this.inviteButton = page.getByTestId('invite-member');
        this.inviteMemberPopup = page.getByTestId('invite-pop-up-title');
        this.crossIcon = page.getByTestId('close-icon')
        this.cancelButton = page.getByTestId('cancel-button')
        this.emailField = page.getByTestId('html-input');
        this.sendInvitationButton = page.getByTestId('send-invitation-button');
        this.successMessage = page.getByText(teamData.validations.invitationSuccessMessage);
        this.deleteInvitationButton = page.locator('[data-test-id="delete-button"]').first();
        this.deleteConfirmationPopup = page.getByText(teamData.validations.deleteConfirmationPopup);
        this.deleteConfirmationButton = page.getByRole('button', { name: 'Yes, delete' });
        this.deleteSuccessMessage = page.getByText(teamData.validations.deleteSuccessMessage);
        this.pendingStatus = page.getByText('Pending');
        this.resendInvitationButton = page.getByRole('button', { name: 'Resend' }).first();
        this.errorMessage = page.getByText(teamData.validations.emailNotValid);
        this.emptyEmailErrorMessage = page.getByText(teamData.validations.emptyEmailErrorMessage);
    }

    async navigateToTeamPage() {
        await this.page.goto('/');
        await clickWebElement(this.teamTab);
        await expect(this.page).toHaveURL(teamData.teamURL)
        await expect(this.teamTitleText).toBeVisible();
    }

    async elementVisibilityOfTeamPage() {
        const elements = [this.fuseLogo, this.importerTab, this.fileImportTab, this.teamTab, this.brandingTab, this.developersTab,
        this.documentTab, this.menuIcon, this.teamTitleText, this.teamTable, this.inviteButton];

        for (const element of elements) {
            await visibilityOfElement(element);
        }
    }

    async verifyMemberInvitation(email) {
        await clickWebElement(this.inviteButton);
        await inputField(this.emailField, email);
        await this.page.waitForTimeout(2000);
        await clickWebElement(this.sendInvitationButton);
        await expect(this.successMessage).toBeVisible({ timeout: 60000 });
        await expect(this.successMessage).toContainText(teamData.validations.invitationSuccessMessage);

    }

    async memberInvitationDeletion() {
        await expect(this.deleteInvitationButton).toBeVisible({ timeout: 6000 });
        await clickWebElement(this.deleteInvitationButton);
        await expect(this.deleteConfirmationPopup).toBeVisible({ timeout: 6000 });
        await expect(this.deleteConfirmationPopup).toContainText(teamData.validations.deleteConfirmationPopup);
        await clickWebElement(this.deleteConfirmationButton);
        await expect(this.deleteSuccessMessage).toBeVisible({ timeout: 6000 });
        await expect(this.deleteSuccessMessage).toContainText(teamData.validations.deleteSuccessMessage);
    }

    async verifyInvitedUserStatusIsPending() {
        await expect(this.pendingStatus.last()).toBeVisible({ timeout: 6000 });
        await expect(this.pendingStatus.last()).toContainText('Pending');
    }

    async performingResendingInvitation() {
        if (this.pendingStatus.isVisible()) {
            {
                await expect(this.resendInvitationButton).toBeVisible({ timeout: 6000 });
                await clickWebElement(this.resendInvitationButton);
                await expect(this.successMessage).toBeVisible({ timeout: 6000 });
                await expect(this.successMessage).toContainText(teamData.validations.invitationSuccessMessage);
            }

        }
    }

    async cancelButtonAndCrossIconFunctionality() {
        const closeButtons = [
            this.crossIcon,
            this.cancelButton
        ];

        for (const button of closeButtons) {
            await expect(this.inviteButton).toBeVisible();
            await clickWebElement(this.inviteButton);

            await expect(this.inviteMemberPopup).toBeVisible();
            await expect(button).toBeVisible();

            await clickWebElement(button);

            await expect(this.inviteMemberPopup).toBeHidden();
        }
    }

    async verifyErrorMessageWhenEmailIsNotValid() {

        await expect(this.inviteButton).toBeVisible();
        await clickWebElement(this.inviteButton);
        await expect(this.inviteMemberPopup).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await this.emailField.fill('test');
        await expect(this.emailField).toHaveValue('test');
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(teamData.validations.emailNotValid);
    }

    async verifyErrorMessageForEmptyEmailInputField() {
        await expect(this.inviteButton).toBeVisible();
        await clickWebElement(this.inviteButton);
        await expect(this.inviteMemberPopup).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await this.sendInvitationButton.click();
        await expect(this.emptyEmailErrorMessage).toBeVisible();
        await expect(this.emptyEmailErrorMessage).toHaveText(teamData.validations.emptyEmailErrorMessage);
    }

}