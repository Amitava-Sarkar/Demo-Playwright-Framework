import { expect } from '@playwright/test';
import brandingData from '../TestData/branding.json' with { type: 'json' };
import path from 'path';


export class Branding {
    constructor(page) {
        this.page = page;
        this.brandingTab = page.getByTestId('brandingLink');
        this.brandingPageTitle = page.getByTestId('brandingTitle');
        this.upgradeLink = page.locator('[data-testid="upgrade-plan-tooltip"]');
        this.brandingPageDescription = page.getByTestId('description-text');
        this.brandLogoText = page.getByTestId('brand-logo-text')
        this.brandLogoDescription = page.getByTestId('brand-logo-description')
        this.uploadImageButton = page.getByRole('button', { name: 'Upload Image' });
        this.revertToOriginalButton = page.getByTestId('revert-original')
        this.previewSection = page.getByTestId('preview-section')
        this.primaryColor = page.locator('label').filter({ hasText: 'Primary Color' })
        this.secondaryColor = page.locator('label').filter({ hasText: 'Secondary Color' })
        this.borderColor = page.locator('label').filter({ hasText: 'Border Color' })
        this.contentColor = page.locator('label').filter({ hasText: 'Content Color' })
        this.backgroundColor = page.locator('label').filter({ hasText: 'Background' })
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.colorCircle = page.getByTestId('color-circle');
        this.backgroundColorOptions = page.getByTestId('background-color-options');
        this.availableBackgroundColor = page.getByTestId('background-color-value');
        this.validationMessage = page.getByText(brandingData.toastMessage.validationMessage);
        this.textColor = page.getByText('White')
        this.imageUploading = page.locator('#logo');
        this.uploadedFile = page.getByTestId('uploaded-file-name')
        this.removeFileLink = page.getByTestId('remove')
        this.fileUploadingErrorMessage = page.getByText(brandingData.images.fileUploadingErrorMessage);
        this.imageUploadedSuccessfullyMessage = page.getByText(brandingData.images.imageUploadedSuccessfullyMessage);
    }

    async navigateToBrandingPage() {
        await this.page.goto('/');
        await expect(this.brandingTab).toBeVisible();
        await this.brandingTab.click();
        await expect(this.page).toHaveURL(/account\/importer-style-preferences/, { timeout: 6000 });
        await expect(this.brandingPageTitle).toBeVisible();
    }

    async visibilityOfAllElementsInBrandingPage() {
        const elements = [
            {
                locator: this.brandingPageTitle,
                text: brandingData.title
            },
            {
                locator: this.brandingPageDescription,
                text: brandingData.description
            },
            {
                locator: this.upgradeLink
            },
            {
                locator: this.brandLogoText
            },
            {
                locator: this.brandLogoDescription,
                text: brandingData.brandLogoDescription
            },
            {
                locator: this.uploadImageButton
            },
            {
                locator: this.revertToOriginalButton
            },
            {
                locator: this.previewSection,
                text: brandingData.previewSection
            },
            {
                locator: this.primaryColor
            },
            {
                locator: this.secondaryColor
            },
            {
                locator: this.borderColor
            },
            {
                locator: this.contentColor
            },
            {
                locator: this.backgroundColor
            },
            {
                locator: this.saveButton,
                text: brandingData.saveButton
            }
        ];
    
        for (const element of elements) {
            await expect(element.locator).toBeVisible();
            if (element.text) {
                await expect(element.locator).toContainText(element.text);
            }
        }
    }

    async verifyFunctionalityOfUpgradeLink() {
        await expect(this.upgradeLink).toBeVisible();
        await this.upgradeLink.click();
        await expect(this.page).toHaveURL(/account\/billing/, { timeout: 60000 });

    }

    async verifyUploadImageButtonIsDisableWhenUserOnStandardPlanTrialPlan() {
        await expect(this.uploadImageButton).toBeVisible();
        await expect(this.uploadImageButton).toHaveAttribute('disabled', '');
    }

    async verifySaveButtonIsDisableWhenUserOnStandardPlanTrialPlan() {
        await expect(this.saveButton).toBeVisible();
        await expect(this.saveButton).toHaveAttribute('disabled', '');
    }

    async verifyFunctionalityOfRevertToOriginalButton() {
        await expect(this.revertToOriginalButton).toBeVisible();
        await this.revertToOriginalButton.scrollIntoViewIfNeeded();
        await expect(this.revertToOriginalButton).toHaveText(brandingData.revertOriginal);
        await this.revertToOriginalButton.click();
    
        const differentColorParameter = [
            this.primaryColor,this.secondaryColor,this.borderColor,this.contentColor,
        ];
        
        const color = brandingData.defaultColor;
        const defaultValue = [
            color.primaryColor,color.secondaryColor,color.borderColor,color.contentColor,
        ];
    
        for (let i = 0; i < differentColorParameter.length; i++) {
            await expect(differentColorParameter[i]).toBeVisible();
            await expect(differentColorParameter[i]).toHaveValue(defaultValue[i][1]);
        }
    }

    async verifyFunctionalityOfBackgroundColorOptionsWRTTrialStandardPlan() {
        await expect(this.colorCircle.last()).toBeVisible();
        await this.colorCircle.last().click();

        for (let i = 0; i < 3; i++) {
            await expect(this.backgroundColorOptions.nth(i)).toBeVisible();
            await expect(this.backgroundColorOptions.nth(i)).toHaveText(brandingData.backgroundColorText[i]);
            await expect(this.availableBackgroundColor.nth(i)).toBeVisible();
            await expect(this.availableBackgroundColor.nth(i)).toHaveCSS('background-color', `rgb${brandingData.backgroundColorValue[i]}`);
        }
    }

    async verifyValidationWhenTryToChangeColorStyleOnStandardTrialPlan() {
        await expect(this.backgroundColor).toBeVisible();
        await this.backgroundColor.click();
        await expect(this.backgroundColorOptions.first()).toBeVisible();
        const textColor = await this.textColor.evaluate(el => getComputedStyle(el).color);
        if(textColor === 'rgb(14, 190, 190)'){
            await this.backgroundColorOptions.nth(1).click();
            await this.page.waitForTimeout(2000); //waiting for the color to change
            await expect(this.saveButton).toBeEnabled();
        } 
        else{
            await this.backgroundColorOptions.first().click();
            await this.page.waitForTimeout(2000); //waiting for the color to change
            await expect(this.saveButton).toBeEnabled();
        }
        await this.saveButton.click();
        await expect(this.page).toHaveURL(/account\/billing/, { timeout: 6000 });
        await expect(this.validationMessage).toBeVisible();
        await expect(this.validationMessage).toHaveText(brandingData.toastMessage.validationMessage);
    }
    
    
    async verifyUploadImageButtonIsEnabledWhenUserOnProfessionalPlan() {
        await expect(this.uploadImageButton).toBeVisible();
        await expect(this.uploadImageButton).toBeEnabled();
    }

    async verifyUserIsNotAbleToUploadImageMoreThan1Mb() {
        await expect(this.uploadImageButton).toBeVisible();
        await expect(this.uploadImageButton).toBeEnabled();
        const filePath = path.resolve(
            'src/support/uploadFiles/image-greater-than1mb.jpg'
          );
        await this.imageUploading.setInputFiles(filePath);
        await expect(this.fileUploadingErrorMessage).toBeVisible();
        await expect(this.fileUploadingErrorMessage).toHaveText(brandingData.images.fileUploadingErrorMessage);
    }

    async verifyUserIsAbleToUploadImageLessThan1Mb() {
        await expect(this.uploadImageButton).toBeVisible();
        await expect(this.uploadImageButton).toBeEnabled();
        const filePath = path.resolve(
            'src/support/uploadFiles/logo-less-than-1mb.jpeg'
          );
        await this.imageUploading.setInputFiles(filePath);
        await expect(this.uploadedFile).toBeVisible();
        await expect(this.uploadedFile).toHaveText(brandingData.images.imageLessThan1Mb);
        await expect(this.removeFileLink).toBeVisible();
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
        await expect(this.imageUploadedSuccessfullyMessage).toBeVisible();
        await expect(this.imageUploadedSuccessfullyMessage).toHaveText(brandingData.images.imageUploadedSuccessfullyMessage);
    }

    async verifyUserIsAbleToRemoveUploadedImage() {
        await expect(this.uploadImageButton).toBeVisible();
        await expect(this.uploadImageButton).toBeEnabled();
        const filePath = path.resolve(
            'src/support/uploadFiles/logo-less-than-1mb.jpeg'
          );
        await this.imageUploading.setInputFiles(filePath);
        await expect(this.uploadedFile).toBeVisible();
        await expect(this.uploadedFile).toHaveText(brandingData.images.imageLessThan1Mb);
        await expect(this.removeFileLink).toBeVisible();
        await this.removeFileLink.click();
        await expect(this.uploadedFile).not.toBeVisible();
        
    }
}
